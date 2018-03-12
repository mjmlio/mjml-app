import { handleActions, createAction } from 'redux-actions'

const initialState = {
  isOpened: false,
  openPath: null,
}

export default handleActions(
  {
    OPEN_EXTERNAL_FILE_OVERLAY: (state, { payload: openPath }) => ({
      ...state,
      isOpened: true,
      openPath,
    }),
    CLOSE_EXTERNAL_FILE_OVERLAY: () => initialState,
  },
  initialState,
)

export const openExternalFileOverlay = createAction(
  'OPEN_EXTERNAL_FILE_OVERLAY',
  openPath => openPath,
)

export const closeExternalFileOverlay = createAction('CLOSE_EXTERNAL_FILE_OVERLAY')
