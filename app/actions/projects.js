import fs from 'fs'
import promisify from 'es6-promisify'
import { replace } from 'react-router-redux'

import { saveSettings } from 'actions/settings'
import { fileDialog } from 'helpers/fs'

const fsAccess = promisify(fs.access)

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

    dispatch({ type: 'PROJECT_ADD', payload: p })
    dispatch(saveSettings())
    dispatch(replace(`/project?path=${p}`))
  }
}

export function removeProject (p) {
  return async dispatch => {
    dispatch({ type: 'PROJECT_REMOVE', payload: p })
    dispatch(saveSettings())
  }
}
