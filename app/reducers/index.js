import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import settings from './settings'
import preview from './preview'

const rootReducer = combineReducers({
  routing,
  settings,
  preview,
})

export default rootReducer
