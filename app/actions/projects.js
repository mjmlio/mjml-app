import fs from 'fs'
import path from 'path'
import { replace } from 'react-router-redux'

import {
  saveSettings,
  cleanBadProjects,
} from 'actions/settings'

import {
  fileDialog,
  fsReadFile,
  fsAccess,
  isValidDir,
} from 'helpers/fs'

import mjml2html from 'helpers/mjml'

export function addProject (p) {
  return async dispatch => {
    if (!p) {
      p = fileDialog({
        properties: [
          'openDirectory',
          'createDirectory',
        ],
      })
      if (!p) { return }
    }

    await fsAccess(p, fs.constants.R_OK | fs.constants.W_OK)

    dispatch(openProject(p))
  }
}

export function removeProject (p) {
  return async dispatch => {
    dispatch({ type: 'PROJECT_REMOVE', payload: p })
    dispatch(saveSettings())
  }
}

export function openProject (path) {
  return dispatch => {
    dispatch(replace(`/project?path=${path}`))
    dispatch({ type: 'PROJECT_ADD', payload: path })
    dispatch(loadIfNeeded(path))
    dispatch(saveSettings())
  }
}

function loadIfNeeded (path) {
  return async (dispatch, getState) => {
    const state = getState()
    const proj = state.projects.find(p => p.get('path') === path)
    if (!proj) {
      const enriched = await loadProject(path)
      dispatch({ type: 'PROJECT_LOAD', payload: enriched })
    }
  }
}

// read the project directory
// eventually find the index.mjml file inside and generate its html
// (to have nice previews in home)
async function loadProject (p) {
  const res = { path: p }
  res.isOK = await isValidDir(p)
  if (res.isOK) {
    try {
      const mjmlContent = await fsReadFile(path.join(p, 'index.mjml'), { encoding: 'utf8' })
      const htmlContent = await mjml2html(mjmlContent)
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

    let enriched = await Promise.all(projectsPaths.map(loadProject))

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
