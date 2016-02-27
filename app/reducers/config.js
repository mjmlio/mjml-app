import os from 'os'
import path from 'path'
import { handleActions } from 'redux-actions'
import { Map } from 'immutable'

const initialState = Map({

  projectDirectory: path.join(os.homedir(), 'mjml-projects')

})

export default handleActions({

  SET_CONFIG: (state, { payload: config }) => config

}, initialState)
