import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Application from 'components/Application'

import HomePage from 'pages/Home'
import FolderPage from 'pages/Folder'

export default (
  <Route path='/' component={Application}>
    <IndexRoute component={HomePage} />
    <Route path='/folder' component={FolderPage} />
  </Route>
)
