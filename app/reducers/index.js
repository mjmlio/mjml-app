import { combineReducers } from 'redux'
import { routeReducer as routing } from 'react-router-redux'

import template from './template'
import templates from './templates'
import config from './config'

const rootReducer = combineReducers({
  routing,
  template,
  templates,
  config
})

export default rootReducer
