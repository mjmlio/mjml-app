import { addAlert } from 'reducers/alerts'

export default store => next => action => {
  try {
    return next(action)
  } catch (err) {
    store.dispatch(addAlert('Uh. Oh. Error occured...', 'error'))
    console.err(err) // eslint-disable-line no-console
  }
}
