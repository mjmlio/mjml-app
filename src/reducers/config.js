import { handleActions } from 'redux-actions'
import { Map } from 'immutable'

const initialState = Map({
  editorTheme: 'clouds_midnight',
  editorShowPreview: true,
  previewMode: 'desktop',
  mjApiKey: '',
  mjApiSecret: '',
  userName: '',
  userEmail: 'foo@bar.com',
  sendTo: 'foo@bar.com',
})

export default handleActions({

  SET_CONFIG: (state, { payload: config }) => config,
  UPDATE_CONFIG: (state, { payload: updater }) => updater(state),

}, initialState)
