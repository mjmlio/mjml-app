import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/App'
import HomePage from './components/HomePage'
import EditorPage from './components/EditorPage'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={HomePage} />
    <Route path='editor' component={EditorPage} />
  </Route>
)
