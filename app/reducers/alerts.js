import { handleActions } from 'redux-actions'

const state = []

export default handleActions(
  {
    ALERT_ADD: (state, { payload: alert }) => [alert, ...state].slice(0, 5),
    ALERT_REMOVE: (state, { payload: id }) => state.filter(a => a.id !== id),
  },
  state,
)

let __ID__ = 0

export function addAlert(message, type = 'info') {
  return dispatch => {
    const alert = { id: __ID__++, message, type }
    dispatch({ type: 'ALERT_ADD', payload: alert })
    setTimeout(() => dispatch(removeAlert(alert.id)), 2e3)
  }
}

export function removeAlert(id) {
  return { type: 'ALERT_REMOVE', payload: id }
}
