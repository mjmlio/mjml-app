import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'

import routes from './routes'
import configureStore from './store/configureStore'
import { loadConfig } from './actions'
import { readTemplates } from './actions/templates'

import './styles/main.scss'
import './helpers/menu'

const store = configureStore()

store.dispatch(loadConfig())
store.dispatch(readTemplates())

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
)
