
import fetch from 'superagent'
import { remote } from 'electron'

const reportUrl = 'http://localhost:3001/crash'

const report = (e, state, action) => {
  fetch
    .post(reportUrl)
    .send({
      state,
      action: action,
      error: JSON.stringify(e),
      version: remote.app.getVersion(),
      appData: remote.app.getPath('appData'),
    })
    .end(err => console.log('Well...', err))
}

export default store => next => action => {
  try {
    return next(action)
  } catch (e) {

    const actionName = typeof action === 'function' ? 'Function' : action.type
    report(e, store.getState().config, actionName)
  }
}
