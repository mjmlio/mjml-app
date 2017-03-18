import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from './routes'
import configureStore from './store/configureStore'
import settings from 'electron-settings'
import os from 'os'

import 'styles/global.scss'
import 'styles/utils.scss'

// --- USER SETTINGS

settings.defaults({
  // the folder where the file explorer will be
  initialFolder: os.homedir(),
})

const store = configureStore()
const history = syncHistoryWithStore(hashHistory, store)

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
)
