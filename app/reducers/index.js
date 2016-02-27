import { combineReducers } from 'redux'
import { routeReducer as routing } from 'react-router-redux'

import template from './template'
import config from './config'

const rootReducer = combineReducers({
  routing,
  template,
  config
})

export default rootReducer
