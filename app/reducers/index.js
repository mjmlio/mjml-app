import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import settings from './settings'
import preview from './preview'
import modals from './modals'
import alerts from './alerts'

const rootReducer = combineReducers({
  routing,
  settings,
  preview,
  modals,
  alerts,
})

export default rootReducer
