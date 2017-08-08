import fs from 'fs'
import os from 'os'
import path from 'path'
import { replace } from 'react-router-redux'
import kebabCase from 'lodash/kebabCase'

import {
  saveSettings,
  cleanBadProjects,
  saveLastOpenedFolder,
  saveLastExportedFolder,
} from 'actions/settings'

import {
  fileDialog,
  fsReadFile,
  fsAccess,
  fsRename,
  fsWriteFile,
  isValidDir,
  rimraf,
} from 'helpers/fs'

import mjml2html from 'helpers/mjml'

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
      rimraf(p)
    }
  }
}

export function openProject(path) {
  return dispatch => {
    dispatch(replace(`/project?path=${path}`))
    dispatch(loadIfNeeded(path))
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
      const indexFilePath = path.join(p, 'index.mjml')
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

export function exportSelectedProjectsToHTML() {
  return (dispatch, getState) => {
    const state = getState()
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
    projectsToExport.forEach(async p => {
      const projBaseName = path.basename(p.get('path'))
      const projSafeName = `${kebabCase(projBaseName)}.html`
      const filePath = path.join(targetPath, projSafeName)
      await fsWriteFile(filePath, p.get('html'))
    })
    dispatch(saveLastExportedFolder(targetPath))
  }
}

if (module.hot) {
  module.hot.accept(() => {
    delete require.cache[require.resolve('./projects')]
    require('./projects')
  })
}
