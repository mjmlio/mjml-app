import fs from 'fs'
import os from 'os'
import path from 'path'
import { replace } from 'react-router-redux'

import {
  saveSettings,
  cleanBadProjects,
  saveLastOpenedFolder,
} from 'actions/settings'

import {
  fileDialog,
  fsReadFile,
  fsAccess,
  fsRename,
  isValidDir,
  rimraf,
} from 'helpers/fs'

import mjml2html from 'helpers/mjml'

const HOME_DIR = os.homedir()

export function addProject (p) {
  return async (dispatch, getState) => {
    if (!p) {
      const state = getState()
      p = fileDialog({
        defaultPath: state.settings.get('lastOpenedFolder') || HOME_DIR,
        properties: [
          'openDirectory',
          'createDirectory',
        ],
      })
      if (!p) { return }
    }

    await fsAccess(p, fs.constants.R_OK | fs.constants.W_OK)

    dispatch(saveLastOpenedFolder(p))
    dispatch(openProject(p))
  }
}

export function removeProject (p, shouldDeleteFolder = false) {
  return dispatch => {
    dispatch({ type: 'PROJECT_REMOVE', payload: p })
    dispatch(saveSettings())
    if (shouldDeleteFolder) {
      rimraf(p)
    }
  }
}

export function openProject (path) {
  return dispatch => {
    dispatch(replace(`/project?path=${path}`))
    dispatch(loadIfNeeded(path))
  }
}

function loadIfNeeded (path) {
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
async function loadProject (p, mjmlPath) {
  const res = { path: p }
  res.isOK = await isValidDir(p)
  if (res.isOK) {
    try {
      const indexFilePath = path.join(p, 'index.mjml')
      const mjmlContent = await fsReadFile(indexFilePath, { encoding: 'utf8' })
      const htmlContent = await mjml2html(mjmlContent, indexFilePath, mjmlPath)
      res.html = htmlContent
    } catch (e) {} // eslint-disable-line
  }
  return res
}

export function loadProjects () {
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
    const pathsToClean = enriched
      .filter(e => !e.isOK)
      .map(e => e.path)

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

export function updateProjectPreview (p, html) {
  return {
    type: 'PROJECT_UPDATE_PREVIEW',
    payload: {
      path: p,
      html,
    },
  }
}

export function renameProject (oldPath, newPath) {
  return async (dispatch) => {
    await fsRename(oldPath, newPath)
    dispatch({
      type: 'PROJECT_RENAME',
      payload: { oldPath, newPath },
    })
    dispatch(saveSettings())
  }
}
