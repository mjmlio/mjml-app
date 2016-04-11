import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { hashHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../reducers'
import actionReport from '../middlewares/action-report'

const enhancer = applyMiddleware(actionReport, thunk, routerMiddleware(hashHistory))

export default function configureStore (initialState) {
  return createStore(rootReducer, initialState, enhancer)
}
