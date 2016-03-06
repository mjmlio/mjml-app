import { combineReducers } from 'redux'
import { routeReducer as routing } from 'react-router-redux'

import templates from './templates'
import presets from './presets'
import config from './config'

const rootReducer = combineReducers({
  routing,
  templates,
  presets,
  config
})

export default rootReducer
