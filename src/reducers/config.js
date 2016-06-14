import { handleActions } from 'redux-actions'
import { Map } from 'immutable'
import { version } from '../../package.json'

const initialState = Map({
  version,
  editorTheme: 'clouds_midnight',
  editorShowPreview: true,
  previewMode: 'desktop',
  mjApiKey: '',
  mjApiSecret: '',
  userName: '',
  userEmail: 'foo@bar.com',
  sendTo: 'foo@bar.com',
  lastVersion: version,
  hiddenVersion: '',
  fontSize: 15,
})

export default handleActions({

  SET_CONFIG: (state, { payload: config }) => config,
  UPDATE_CONFIG: (state, { payload: updater }) => updater(state),

}, initialState)
