import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import routes from './routes'
import configureStore from './store/configureStore'
import loadSettings from './loadSettings'

import { loadProjects } from 'actions/projects'

import { openModal } from 'reducers/modals'

import 'styles/global.scss'
import 'styles/utils.scss'

const store = configureStore()
const history = syncHistoryWithStore(hashHistory, store)

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
)

loadSettings()
  .then(settings => { store.dispatch({ type: 'SETTINGS_LOAD_SUCCESS', payload: settings }) })
  .then(() => store.dispatch(loadProjects()))

// handle menu actions
require('electron').ipcRenderer.on('redux-command', (event, message) => {
  if (message === 'new-project') {
    store.dispatch(openModal('newProject'))
  }
})
