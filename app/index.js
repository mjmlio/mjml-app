import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import routes from './routes'
import configureStore from './store/configureStore'
import './app.css'

const store = configureStore()

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
)
