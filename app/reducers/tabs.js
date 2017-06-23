import { handleActions, createAction } from 'redux-actions'
import path from 'path'
import { fromJS } from 'immutable'

const state = fromJS([])

export default handleActions({
  TAB_OPEN: (state, { payload: filePath }) => {
    const foundIndex = state.findIndex(t => t.get('path') === filePath)
    if (foundIndex > -1) {
      return state
        .map(t => t.set('isFocused', false))
        .setIn([foundIndex, 'isFocused'], true)
    }
    return state
      .map(t => t.set('isFocused', false))
      .push(fromJS({
        path: filePath,
        name: path.basename(filePath),
        isFocused: true,
      }))
  },
  TAB_FOCUS: (state, { payload: filePath }) => {
    const foundIndex = state.findIndex(t => t.get('path') === filePath)
    if (foundIndex === -1) { return state }
    return state
      .map(t => t.set('isFocused', false))
      .setIn([foundIndex, 'isFocused'], true)
  },
  TAB_CLOSE: (state, { payload: filePath }) => {
    const indexToRemove = state.findIndex(t => t.get('path') === filePath)
    if (!indexToRemove === -1) { return state }
    if (state.getIn([indexToRemove, 'isFocused']) === true) {
      const indexToFocus = state.size > 1 ? indexToRemove === 0 ? 1 : indexToRemove - 1 : -1
      state = state.map(t => t.set('isFocused', false))
      if (indexToFocus > -1) {
        state = state.setIn([indexToFocus, 'isFocused'], true)
      }
    }
    state = state.remove(indexToRemove)
    return state
  },
}, state)

export const openTab = createAction('TAB_OPEN')
export const focusTab = createAction('TAB_FOCUS')
export const closeTab = createAction('TAB_CLOSE')
