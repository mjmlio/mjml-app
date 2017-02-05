import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Application from './components/Application'
import HomePage from './components/HomePage'

export default (
  <Route path='/' component={Application}>
    <IndexRoute component={HomePage} />
  </Route>
)
