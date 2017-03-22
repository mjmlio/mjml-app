import { handleActions } from 'redux-actions'

export default handleActions({

  OPEN_MODAL: (state, { payload: modalName }) => ({
    ...state,
    [modalName]: true,
  }),

  CLOSE_MODAL: (state, { payload: modalName }) => ({
    ...state,
    [modalName]: false,
  }),

}, {})

export function isModalOpened (state, modalName) {
  return state.modals[modalName] === true
}

export function openModal (modalName) {
  return {
    type: 'OPEN_MODAL',
    payload: modalName,
  }
}

export function closeModal (modalName) {
  return {
    type: 'CLOSE_MODAL',
    payload: modalName,
  }
}
