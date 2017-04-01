import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable'

export default handleActions({

  PROJECT_LOAD: (state, { payload }) => state.unshift(fromJS(payload)),
  PROJECTS_LOAD: (state, { payload }) => fromJS(payload),
  PROJECT_UPDATE_PREVIEW: (state, { payload }) => {
    if (!state) { return state }
    const { path, html } = payload
    const index = state.findIndex(pr => pr.get('path') === path)
    if (index === -1) { return state }
    return state.update(index, p => p.set('html', html))
  },
  PROJECT_REMOVE: (state, { payload: path }) => {
    return state.filter(p => p.get('path') !== path)
  },

}, null)
