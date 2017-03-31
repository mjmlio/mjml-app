import { handleActions } from 'redux-actions'
import { Map, Set } from 'immutable'

const state = null

export default handleActions({

  SETTINGS_LOAD_SUCCESS: (state, { payload }) => {
    return Map({
      projects: Set(payload.projects),
      editor: Map(payload.editor),
      api: Map(payload.api),
    })
  },

  UPDATE_SETTINGS: (state, { payload: updater }) => updater(state),

  PROJECT_OPEN: (state, { payload: path }) => state
    .update('projects', projects => projects.remove(path).add(path)),

  PROJECT_REMOVE: (state, { payload: path }) => state
    .update('projects', projects => projects.remove(path)),

  PROJECTS_REMOVE: (state, { payload: paths }) => state
    .update('projects', projects => projects.filter(p => paths.indexOf(p) === -1)),

}, state)
