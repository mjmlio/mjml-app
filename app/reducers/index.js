import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import settings from './settings'
import preview from './preview'
import modals from './modals'
import projects from './projects'
import alerts from './alerts'
import notifs from './notifs'
import error from './error'

const rootReducer = combineReducers({
  routing,
  settings,
  preview,
  modals,
  alerts,
  notifs,
  projects,
  error,
})

export default rootReducer
