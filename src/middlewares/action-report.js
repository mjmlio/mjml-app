
import fetch from 'superagent'
import { remote } from 'electron'
import fs from 'fs'
import path from 'path'

const reportUrl = 'http://localhost:3001/crash'

/**
 * Send a report to the server
 *
 * @param {Object} e the error stack trace
 * @param {Object} state the current state
 * @param {String} the action name ('Function' if it is a function)
 * @returns {undefined}
 */
const report2 = (e, state, action) =>
  fetch
    .post(reportUrl)
    .send({
      state,
      action,
      error: JSON.stringify({ stack: e.stack, message: e.message }),
      version: remote.app.getVersion(),
      appData: remote.app.getPath('appData'),
    })
    .end(() => false)

const report = (e, state, action) =>
  console.log(JSON.stringify(e, null, 4)) ||
  fs.writeFile(path.join(remote.app.getPath('home'), 'mjml-log'), JSON.stringify({
    state,
    action,
    error: JSON.stringify({ message: e.message, stack: e.stack }),
    version: remote.app.getVersion(),
    appData: remote.app.getPath('appData'),
  }, null, 2), err => console.log(err || 'report created'))

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
