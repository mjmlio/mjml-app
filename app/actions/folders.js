import fs from 'fs'
import promisify from 'es6-promisify'
import { replace } from 'react-router-redux'

import { saveSettings } from 'actions/settings'
import { fileDialog } from 'helpers/fs'

const fsAccess = promisify(fs.access)

export function addFolder (p) {
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

    dispatch({ type: 'FOLDER_ADD', payload: p })
    dispatch(saveSettings())
    dispatch(replace(`/folder?path=${p}`))
  }
}

export function removeFolder (p) {
  return async dispatch => {
    dispatch({ type: 'FOLDER_REMOVE', payload: p })
    dispatch(saveSettings())
  }
}
