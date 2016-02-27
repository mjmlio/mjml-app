import { combineReducers } from 'redux'
import { routeReducer as routing } from 'react-router-redux'

import template from './template'

const rootReducer = combineReducers({
  routing,
  template
})

export default rootReducer
