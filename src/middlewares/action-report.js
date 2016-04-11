
import fetch from 'superagent'
import { remote } from 'electron'

const reportUrl = 'http://localhost:3001/crash'

/**
 * Send a report to the server
 *
 * @param {Object} e the error stack trace
 * @param {Object} state the current state
 * @param {String} the action name ('Function' if it is a function)
 * @returns {undefined}
 */
const report = (e, state, action) =>
  fetch
    .post(reportUrl)
    .send({
      state,
      action,
      error: JSON.stringify(e),
      version: remote.app.getVersion(),
      appData: remote.app.getPath('appData'),
    })
    .end(() => false)

/**
 * actionReport middleware. post a crash report if an action throws an error
 *
 * @param {Object} store the app store
 * @param {Function} next calls the action on the state
 * @param {Function} action the action passed to dispatch
 * @returns {Object} new state
 */
export default store => next => action => {
  try {
    return next(action)
  } catch (e) {

    const actionName = typeof action === 'function' ? 'Function' : action.type
    report(e, store.getState().config, actionName)
  }
}
