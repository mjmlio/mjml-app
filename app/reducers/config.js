import { handleActions } from 'redux-actions'
import { Map } from 'immutable'

const initialState = Map({
  editorTheme: 'solarized_dark',
  editorShowPreview: true
})

export default handleActions({

  SET_CONFIG: (state, { payload: config }) => config,
  UPDATE_CONFIG: (state, { payload: updater }) => updater(state)

}, initialState)
