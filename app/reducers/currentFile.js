import { handleActions } from 'redux-actions'

export default handleActions(
  {
    CURRENT_SET: (state, { payload: currentFile }) => currentFile,
  },
  null,
)

export function setCurrentFile(file) {
  return {
    type: 'CURRENT_SET',
    payload: file,
  }
}
