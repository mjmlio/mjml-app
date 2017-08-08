import { handleActions } from 'redux-actions'

export default handleActions(
  {
    SET_PREVIEW: (state, { payload }) => payload,
  },
  null,
)
