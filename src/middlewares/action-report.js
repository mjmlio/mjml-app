import { remote } from 'electron'
import fs from 'fs'
import path from 'path'

const report = (e, state, action) =>
  fs.writeFile(path.join(remote.app.getPath('home'), 'mjml-log'), JSON.stringify({
    state,
    action,
    error: JSON.stringify({ message: e.message, stack: e.stack }),
    version: remote.app.getVersion(),
    appData: remote.app.getPath('appData'),
  }, null, 2))

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
