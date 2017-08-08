import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Application from 'components/Application'

import HomePage from 'pages/Home'
import ProjectPage from 'pages/Project'

export default (
  <Route path="/" component={Application}>
    <IndexRoute component={HomePage} />
    <Route path="/project" component={ProjectPage} />
  </Route>
)
