import { handleActions } from 'redux-actions'
import { List, Map } from 'immutable'

export default handleActions(
  {
    NOTIF_ADD: (state, { payload: notif }) => state.push(notif),
    NOTIF_REMOVE: (state, { payload: id }) => state.filter(a => a.get('id') !== id),
  },
  List(),
)

let __ID__ = 0

export function addNotif(content) {
  return dispatch => {
    const notif = Map({
      id: __ID__++,
      content,
    })
    dispatch({ type: 'NOTIF_ADD', payload: notif })
  }
}

export function removeNotif(id) {
  return { type: 'NOTIF_REMOVE', payload: id }
}
