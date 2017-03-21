import { handleActions } from 'redux-actions'
import { Map, Set } from 'immutable'

const state = null

export default handleActions({

  SETTINGS_LOAD_SUCCESS: (state, { payload }) => {
    return Map({
      projects: Set(payload.projects),
    })
  },

  PROJECT_ADD: (state, { payload: path }) => state
    .update('projects', projects => projects.add(path)),

  PROJECT_REMOVE: (state, { payload: path }) => state
    .update('projects', projects => projects.remove(path)),

}, state)
