import React from 'react'
import { Route } from 'react-router'

import App from './components/App'
import HomePage from './components/HomePage'
import EditorPage from './components/EditorPage'
import Documentation from './components/Documentation'
import ComingSoon from './components/ComingSoon'

// browse page
import BrowseTemplates from './components/browse/Templates'
import BrowsePresets from './components/browse/Presets'

export default (
  <Route component={App}>

    <Route path='/' component={HomePage} />

    <Route path='browse' component={HomePage}>
      <Route path='templates' component={BrowseTemplates} />
      <Route path='presets' component={BrowsePresets} />
      <Route path='components' component={ComingSoon} />
    </Route>

    <Route path='editor' component={EditorPage} />
    <Route path='documentation' component={Documentation} />
    <Route path='coming-soon' component={ComingSoon} />

  </Route>
)
