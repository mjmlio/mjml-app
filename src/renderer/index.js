import React from 'react'
import { render } from 'react-dom'
import { hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { AppContainer } from 'react-hot-loader'
import { ipcRenderer } from 'electron'

import configureStore from 'store/configureStore'
import { loadSettings } from 'actions/settings'
import { loadProjects, addProject, openExternalFile } from 'actions/projects'

import Root from 'components/Root'

import { openModal } from 'reducers/modals'

import 'styles/global.scss'
import 'styles/utils.scss'

const store = configureStore()
const history = syncHistoryWithStore(hashHistory, store)
const { dispatch } = store
const rootNode = document.getElementById('app')

function r(Comp) {
  render(
    <AppContainer>
      <Comp store={store} history={history} />
    </AppContainer>,
    rootNode,
  )
}

r(Root)

async function boot() {
  await dispatch(loadSettings())
  await dispatch(loadProjects())
}

boot()

// handle menu actions
ipcRenderer.on('redux-command', (event, message) => {
  if (message === 'about') {
    store.dispatch(openModal('about'))
  }
  if (message === 'new-project') {
    store.dispatch(openModal('newProject'))
  }
  if (message === 'open-project') {
    store.dispatch(addProject())
  }
})

ipcRenderer.on('openPath', (event, openPath) => {
  store.dispatch(openExternalFile(openPath))
})

if (module.hot) {
  module.hot.accept('../components/Root.js', () => {
    const NewRoot = require('../components/Root').default
    r(NewRoot)
  })
}
