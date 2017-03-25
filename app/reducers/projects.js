import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable'

export default handleActions({

  PROJECTS_LOAD: (state, { payload }) => fromJS(payload),
  PROJECT_UPDATE_PREVIEW: (state, { payload }) => {
    if (!state) { return state }
    const { path, html } = payload
    const index = state.findIndex(pr => pr.path === path)
    if (index === -1) { return state }
    return state.update(index, p => p.set('html', html))
  },

}, null)
