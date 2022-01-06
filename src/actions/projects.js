import fs from 'fs'
import os from 'os'
import path from 'path'
import trash from 'trash'
import { replace } from 'react-router-redux'
import { kebabCase, find, endsWith } from 'lodash'

import { takeScreenshot } from 'helpers/takeScreenshot'
import mjml2html from 'helpers/mjml'

import { addAlert } from 'reducers/alerts'
import { openExternalFileOverlay, closeExternalFileOverlay } from 'reducers/externalFileOverlay'

import {
  saveSettings,
  cleanBadProjects,
  saveLastOpenedFolder,
  saveLastExportedFolder,
} from 'actions/settings'

import {
  fsStat,
  recursiveCopy,
  fileDialog,
  fsReadFile,
  fsReadDir,
  fsAccess,
  fsRename,
  fsWriteFile,
  fsMkdir,
  fileExists,
  isValidDir,
} from 'helpers/fs'

const HOME_DIR = os.homedir()

export function addProject(p) {
  return async (dispatch, getState) => {
    if (!p) {
      const state = getState()
      p = fileDialog({
        defaultPath: state.settings.get('lastOpenedFolder') || HOME_DIR,
        properties: ['openDirectory', 'createDirectory'],
      })
      if (!p) {
        return
      }
    }

    await fsAccess(p, fs.constants.R_OK | fs.constants.W_OK)

    dispatch(saveLastOpenedFolder(p))
    dispatch(openProject(p))
  }
}

export function removeProject(p, shouldDeleteFolder = false) {
  return dispatch => {
    dispatch({ type: 'PROJECT_REMOVE', payload: p })
    dispatch(saveSettings())
    if (shouldDeleteFolder) {
      trash(p)
    }
  }
}

export function openProject(projectPath) {
  return dispatch => {
    dispatch(replace(`/project?path=${projectPath}`))
    dispatch(loadIfNeeded(projectPath))
  }
}

function loadIfNeeded(path) {
  return async (dispatch, getState) => {
    const state = getState()
    const proj = state.projects.find(p => p.get('path') === path)
    if (!proj) {
      const enriched = await loadProject(path)
      dispatch({ type: 'PROJECT_LOAD', payload: enriched })
      dispatch(saveSettings())
    }
  }
}

// read the project directory
// eventually find the index.mjml file inside and generate its html
// (to have nice previews in home)
async function loadProject(p, mjmlPath) {
  const res = { path: p }
  res.isOK = await isValidDir(p)
  if (res.isOK) {
    try {
      let indexFilePath = path.join(p, 'index.mjml')
      const indexExists = await fileExists(indexFilePath)

      if (!indexExists) {
        const dir = await fsReadDir(p)
        const fallback = find(dir, name => endsWith(name, '.mjml'))

        if (fallback) indexFilePath = path.join(p, fallback)
      }

      const mjmlContent = await fsReadFile(indexFilePath, { encoding: 'utf8' })
      const { html: htmlContent } = await mjml2html(mjmlContent, indexFilePath, mjmlPath)
      res.html = htmlContent
    } catch (e) {} // eslint-disable-line
  }
  return res
}

export function loadProjects() {
  return async (dispatch, getState) => {
    const state = getState()
    const { settings } = state

    const projectsPaths = settings.get('projects')

    // eventually get the custom mjml path set in settings
    const mjmlManual = settings.getIn(['mjml', 'engine']) === 'manual'
    const mjmlPath = mjmlManual ? settings.getIn(['mjml', 'path']) : undefined
    const load = proj => loadProject(proj, mjmlPath)

    let enriched = await Promise.all(projectsPaths.map(load))

    // eventually clean settings from bad projects paths
    const pathsToClean = enriched.filter(e => !e.isOK).map(e => e.path)

    if (pathsToClean.length > 0) {
      dispatch(cleanBadProjects(pathsToClean))
      dispatch(saveSettings())
    }

    enriched = enriched.filter(e => e.isOK)

    dispatch({
      type: 'PROJECTS_LOAD',
      payload: enriched,
    })
  }
}

export function updateProjectPreview(p, html) {
  return {
    type: 'PROJECT_UPDATE_PREVIEW',
    payload: {
      path: p,
      html,
    },
  }
}

export function renameProject(oldPath, newPath) {
  return async dispatch => {
    await fsRename(oldPath, newPath)
    dispatch({
      type: 'PROJECT_RENAME',
      payload: { oldPath, newPath },
    })
    dispatch(saveSettings())
  }
}

export function dropFile(filePath) {
  return dispatch => {
    const ext = path.extname(filePath)
    if (ext !== '.mjml') {
      return
    }
    const dir = path.dirname(filePath)
    dispatch(openProject(dir))
  }
}

async function massExport(state, asyncJob, allFiles = false) {
  const projectsToExport = state.projects
    .filter(p => state.selectedProjects.find(path => path === p.get('path')))
    .filter(p => p.get('html'))

  if (projectsToExport.size === 0) {
    return
  }
  const targetPath = fileDialog({
    defaultPath: state.settings.get('lastExportedFolder') || HOME_DIR,
    properties: ['openDirectory', 'createDirectory'],
  })
  if (!targetPath) {
    return
  }
  for (let i = 0; i < projectsToExport.size; i++) {
    const p = projectsToExport.get(i)
    const projPath = p.get('path')
    const projBaseName = path.basename(projPath)
    
    if (allFiles) {
      // eventually get the custom mjml path set in settings
      const { settings } = state
      const projectsPaths = settings.get('projects')
      const mjmlManual = settings.getIn(['mjml', 'engine']) === 'manual'
      const mjmlPath = mjmlManual ? settings.getIn(['mjml', 'path']) : undefined
      
      const files = await fsReadDir(projPath)
      const mjmlFiles = files.filter(name => name.includes('.mjml'))
      if (!mjmlFiles.length) return
      
      const targetDir = path.join(targetPath, kebabCase(projBaseName))
      if (!fs.existsSync(targetDir)) await fsMkdir(targetDir)
      
      for (const file of mjmlFiles) {
        const mjml = await fsReadFile(path.join(projPath, file), 'utf8')
        const result = await mjml2html(mjml, projPath, mjmlPath)
        
        const targetName = file.replace('.mjml', '.html')
        const targetPath = path.join(targetDir, targetName)
        
        await asyncJob(targetPath, result.html)
      }
    } else {
      const projSafeName = `${kebabCase(projBaseName)}.html`
      const filePath = path.join(targetPath, projSafeName)
      await asyncJob(filePath, p, targetPath)
    }
  }
  return targetPath
}

export function exportSelectedProjectsToHTML() {
  return async (dispatch, getState) => {
    const targetPath = await massExport(getState(), (filePath, p) =>
      fsWriteFile(filePath, p.get('html')),
    )
    if (targetPath) {
      dispatch(saveLastExportedFolder(targetPath))
    }
  }
}

export function exportSelectedProjectsAllFilesToHTML() {
  return async (dispatch, getState) => {
    const targetPath = await massExport(getState(), (filePath, html) =>
      fsWriteFile(filePath, html, { flag: 'w' }),
      true
    )
    if (targetPath) {
      dispatch(saveLastExportedFolder(targetPath))
    }
  }
}

export function exportSelectedProjectsToImages(done) {
  return async (dispatch, getState) => {
    const state = getState()

    const targetPath = await massExport(state, async (filePath, p, targetDir) => {
      const html = p.get('html')
      const previewSize = state.settings.get('previewSize')
      const [mobileWidth, desktopWidth] = [previewSize.get('mobile'), previewSize.get('desktop')]
      const [mobileScreenshot, desktopScreenshot] = await Promise.all([
        takeScreenshot(html, mobileWidth, targetDir),
        takeScreenshot(html, desktopWidth, targetDir),
      ])
      await Promise.all([
        fsWriteFile(`${filePath.replace(/.html$/, '')}_mobile.png`, mobileScreenshot),
        fsWriteFile(`${filePath.replace(/.html$/, '')}_desktop.png`, desktopScreenshot),
      ])
    })
    if (targetPath) {
      dispatch(addAlert('Successfully exported to images', 'success'))
      dispatch(saveLastExportedFolder(targetPath))
    }
    done()
  }
}

async function getDuplicatePath(projectPath, increment = 1) {
  if (increment > 10) {
    throw new Error('Cant determine duplicate path')
  }
  const duplicatePath = `${projectPath} (${increment})`
  try {
    await fsStat(duplicatePath)
    return getDuplicatePath(projectPath, increment + 1)
  } catch (err) {
    if (err.code === 'ENOENT') {
      return duplicatePath
    }
    throw err
  }
}

export function duplicateProject(projectPath) {
  return async dispatch => {
    try {
      const newProjectPath = await getDuplicatePath(projectPath)
      await recursiveCopy(projectPath, newProjectPath)
      dispatch(loadIfNeeded(newProjectPath))
    } catch (err) {
      console.log(err) // eslint-disable-line
    }
  }
}

/**
 * As opening external file will trigger an instant app load + project load
 * we need to wait for the reducers to be ready
 */
async function waitUntilLoaded(getState, timeout = 5e3) {
  const { settings, projects } = getState()
  if (settings && projects) {
    return true
  }
  if (timeout <= 0) {
    throw new Error('Loading settings took too long')
  }
  await new Promise(resolve => setTimeout(resolve, 500))
  return waitUntilLoaded(getState, timeout - 500)
}

export function openExternalFile(filePath) {
  return async (dispatch, getState) => {
    const exists = await fileExists(filePath)
    if (!exists) {
      return
    }
    dispatch(openExternalFileOverlay(filePath))
    try {
      const dirName = path.dirname(filePath)
      const validDir = await isValidDir(dirName)
      if (!validDir) {
        throw new Error('Cant open that.')
      }
      await waitUntilLoaded(getState)
      dispatch(openProject(dirName))
    } catch (err) {
      console.log(err) // eslint-disable-line no-console
    }
    dispatch(closeExternalFileOverlay())
  }
}
