import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import routes from './routes'
import configureStore from './store/configureStore'
import { loadSettings } from './actions/settings'

import { loadProjects, addProject } from 'actions/projects'
import queryLastVersion from 'actions/queryLastVersion'

import { openModal } from 'reducers/modals'
import { addNotif } from 'reducers/notifs'

import 'styles/global.scss'
import 'styles/utils.scss'

const store = configureStore()
const history = syncHistoryWithStore(hashHistory, store)
const { dispatch } = store

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
)

async function boot () {
  await dispatch(loadSettings())
  await dispatch(loadProjects())
  dispatch(queryLastVersion())
}

boot()

// handle menu actions
require('electron').ipcRenderer.on('redux-command', (event, message) => {
  if (message === 'new-project') {
    store.dispatch(openModal('newProject'))
  }
  if (message === 'open-project') {
    store.dispatch(addProject())
  }
})
