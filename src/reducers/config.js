import { handleActions } from 'redux-actions'
import { Map } from 'immutable'

const initialState = Map({
  editorTheme: 'solarized_dark',
  editorShowPreview: true,
  previewMode: 'desktop',
  mjApiKey: '85480869a17b7d13ef8bd393283d40d9',
  mjApiSecret: 'cfde34b98d5030ee93f8fb3f03036275',
  userName: 'Guillaume',
  userEmail: 'gbadi@student.42.fr'
})

export default handleActions({

  SET_CONFIG: (state, { payload: config }) => config,
  UPDATE_CONFIG: (state, { payload: updater }) => updater(state)

}, initialState)
