import { setError } from 'reducers/error'

export default store => next => action => {
  try {
    return next(action)
  } catch (err) {
    store.dispatch(setError(err))
    console.error(err) // eslint-disable-line no-console
  }
}
