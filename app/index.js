import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory, match } from 'react-router'
import { trigger } from 'redial'

import routes from './routes'
import configureStore from './store/configureStore'
import { loadConfig } from './actions'
import { readTemplates } from './actions/templates'

import './styles/main.scss'
// import './actions/shortcuts'

const store = configureStore()
const { dispatch } = store

Promise.all([
  store.dispatch(loadConfig()),
  store.dispatch(readTemplates())
]).then(() => {

  hashHistory.listen(location => {
    match({ routes, location }, (error, redirectLocation, renderProps) => {
      const { components, params, location: { path } } = renderProps

      trigger('fetch', components, { params, path, dispatch })
        .then(() => {
          render(
            <Provider store={store}>
              <Router history={hashHistory}>
                {routes}
              </Router>
            </Provider>,
            document.getElementById('root')
          )
        })
    })
  })

})
