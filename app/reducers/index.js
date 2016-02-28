import { combineReducers } from 'redux'
import { routeReducer as routing } from 'react-router-redux'

import templates from './templates'
import config from './config'

const rootReducer = combineReducers({
  routing,
  templates,
  config
})

export default rootReducer
