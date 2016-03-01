import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/App'
import HomePage from './components/HomePage'
import EditorPage from './components/EditorPage'
import SettingsPage from './components/SettingsPage'
import Documentation from './components/Documentation'
import ComingSoon from './components/ComingSoon'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={HomePage} />
    <Route path='editor' component={EditorPage} />
    <Route path='settings' component={SettingsPage} />
    <Route path='documentation' component={Documentation} />
    <Route path='coming-soon' component={ComingSoon} />
  </Route>
)
