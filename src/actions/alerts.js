import { createAction } from 'redux-actions'
import { Map } from 'immutable'
import shortid from 'shortid'

const ALERT_DURATION = 10e3

const alertEmitted = createAction('ALERT_EMITTED')
export const dismissAlert = createAction('ALERT_DISMISSED')

export const emitAlert = (message, level = 'info') => dispatch => {

  const a = Map({
    id: shortid.generate(),
    message,
    level,
  })

  dispatch(alertEmitted(a))

  setTimeout(() => {
    dispatch(dismissAlert(a))
  }, ALERT_DURATION)

}
