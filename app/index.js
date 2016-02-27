import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import { Map } from 'immutable'

import routes from './routes'
import configureStore from './store/configureStore'
import { setTemplate } from './actions/template'

import './styles/main.scss'

const store = configureStore()

store.dispatch(setTemplate(Map({
  name: 'dummy template',
  mjml: '<mj-body></mj-body>'
})))

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
)
