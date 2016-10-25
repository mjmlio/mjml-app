import { handleActions } from 'redux-actions'
import { List } from 'immutable'

const MAX_CONCURRENT_ALERTS = 1
const state = List()

export default handleActions({
  ALERT_EMITTED: (state, { payload: a }) => state.unshift(a).slice(0, MAX_CONCURRENT_ALERTS),
  ALERT_DISMISSED: (state, { payload: a }) => {
    const index = state.findIndex(el => el === a)
    return (index > -1)
      ? state.splice(index, 1)
      : state
  },
}, state)
