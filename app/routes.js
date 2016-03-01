import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/App'
import HomePage from './components/HomePage'
import EditorPage from './components/EditorPage'
import SettingsPage from './components/SettingsPage'
import ThumbnailPage from './components/ThumbnailPage'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={HomePage} />
    <Route path='editor' component={EditorPage} />
    <Route path='thumbnail/:id' component={ThumbnailPage} />
    <Route path='settings' component={SettingsPage} />
  </Route>
)
