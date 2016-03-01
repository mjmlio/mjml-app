import React from 'react'
import { Route } from 'react-router'

import App from './components/App'
import HomePage from './components/HomePage'
import EditorPage from './components/EditorPage'
import Documentation from './components/Documentation'
import ComingSoon from './components/ComingSoon'

// browse page
import BrowseRecent from './components/browse/Recent'
import BrowseTemplates from './components/browse/Templates'

export default (
  <Route component={App}>

    <Route path='/' component={HomePage} />

    <Route path='browse' component={HomePage}>
      <Route path='recent' component={BrowseRecent} />
      <Route path='templates' component={BrowseTemplates} />
      <Route path='components' component={BrowseRecent} />
    </Route>

    <Route path='editor' component={EditorPage} />
    <Route path='documentation' component={Documentation} />
    <Route path='coming-soon' component={ComingSoon} />

  </Route>
)
