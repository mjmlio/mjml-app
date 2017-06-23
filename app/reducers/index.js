import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import settings from './settings'
import preview from './preview'
import modals from './modals'
import projects from './projects'
import alerts from './alerts'
import notifs from './notifs'
import error from './error'
import selectedProjects from './selectedProjects'
import tabs from './tabs'

const rootReducer = combineReducers({
  routing,
  settings,
  preview,
  modals,
  alerts,
  notifs,
  projects,
  error,
  selectedProjects,
  tabs,
})

export default rootReducer
