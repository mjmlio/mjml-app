import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/App'
import HomePage from './components/Home'
import EditorPage from './components/Editor'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={HomePage} />
    <Route path='editor' component={EditorPage} />
  </Route>
)
