import { handleActions } from 'redux-actions'
import { Map, List } from 'immutable'
import uniq from 'lodash/uniq'

const state = null

export default handleActions(
  {
    SETTINGS_LOAD_SUCCESS: (state, { payload }) => {
      return Map({
        lastOpenedFolder: payload.lastOpenedFolder,
        projects: List(payload.projects),
        editor: Map(payload.editor),
        api: Map(payload.api),
        mjml: Map(payload.mjml),
        previewSize: Map(payload.previewSize),
      })
    },

    UPDATE_SETTINGS: (state, { payload: updater }) => updater(state),

    ADD_TO_LAST_USED_EMAILS: (state, { payload: emails }) => {
      const lastEmails = uniq([...state.getIn(['api', 'LastEmails']), ...emails])
      // console.log(lastEmails)
      // return state.setIn(['api', 'LastEmails'], [])
      return state.setIn(['api', 'LastEmails'], lastEmails)
    },

    REMOVE_FROM_LAST_USED_EMAILS: (state, { payload: email }) => {
      return state.updateIn(['api', 'LastEmails'], lastEmails => {
        return lastEmails.filter(e => e !== email)
      })
    },

    PROJECT_LOAD: (state, { payload: { path } }) =>
      state.update('projects', p => {
        if (p.find(p => p === path)) {
          return state
        }
        return p.unshift(path)
      }),

    PROJECT_REMOVE: (state, { payload: path }) =>
      state.update('projects', projects => projects.filter(p => p !== path)),

    PROJECT_RENAME: (state, { payload: { oldPath, newPath } }) =>
      state.update('projects', projects =>
        projects.map(p => {
          if (p !== oldPath) {
            return p
          }
          return newPath
        }),
      ),

    PROJECTS_REMOVE: (state, { payload: paths }) =>
      state.update('projects', projects => projects.filter(p => paths.indexOf(p) === -1)),
  },
  state,
)
