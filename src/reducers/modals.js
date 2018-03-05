import { handleActions } from 'redux-actions'

export default handleActions(
  {
    OPEN_MODAL: (state, { payload: { modalName, modalProps } }) => ({
      ...state,
      [modalName]: modalProps,
    }),

    CLOSE_MODAL: (state, { payload: modalName }) => ({
      ...state,
      [modalName]: false,
    }),
  },
  {},
)

export function isModalOpened(state, modalName) {
  return !!state.modals[modalName]
}

export function getModalProps(state, modalName) {
  return state.modals[modalName]
}

export function openModal(modalName, modalProps = true) {
  return {
    type: 'OPEN_MODAL',
    payload: {
      modalName,
      modalProps,
    },
  }
}

export function closeModal(modalName) {
  return {
    type: 'CLOSE_MODAL',
    payload: modalName,
  }
}
