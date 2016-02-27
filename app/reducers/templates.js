import { handleActions } from 'redux-actions'
import { List } from 'immutable'

const state = List()

export default handleActions({

  RECEIVE_TEMPLATES: (state, { payload: templates }) => state.concat(templates)

}, state)
