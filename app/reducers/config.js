import { handleActions } from 'redux-actions'

const state = null

export default handleActions(
  {
    CONFIG_SET: (state, { payload }) => payload,
  },
  state,
)
