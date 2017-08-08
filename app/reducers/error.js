import { handleActions } from 'redux-actions'

export default handleActions(
  {
    ERROR_SET: (state, { payload }) => payload,
  },
  null,
)

export function setError(err) {
  return { type: 'ERROR_SET', payload: err }
}
