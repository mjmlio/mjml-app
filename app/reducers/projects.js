import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable'

export default handleActions({

  PROJECTS_LOAD: (state, { payload }) => fromJS(payload),

}, null)
