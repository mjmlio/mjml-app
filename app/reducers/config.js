import os from 'os'
import path from 'path'
import { handleActions } from 'redux-actions'
import { Map } from 'immutable'

const initialState = Map({
  projectDirectory: path.join(os.homedir(), 'mjml-projects'),
  editorTheme: 'solarized_dark',
  editorShowPreview: true
})

export default handleActions({

  SET_CONFIG: (state, { payload: config }) => config,
  UPDATE_CONFIG: (state, { payload: updater }) => updater(state)

}, initialState)
