import fs from 'fs'
import { replace } from 'react-router-redux'

import { saveSettings } from 'actions/settings'
import { fileDialog, fsAccess } from 'helpers/fs'

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
    window.requestIdleCallback(() => {
      dispatch({ type: 'PROJECT_ADD', payload: path })
      dispatch(saveSettings())
    })
  }
}
