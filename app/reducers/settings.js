
import { handleActions } from 'redux-actions'
import { List } from 'immutable'

const state = List()

export default handleActions({
  RECEIVE_SETTINGS: (state, { payload: settings }) => settings
}, state)
