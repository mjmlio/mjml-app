import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { hashHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../reducers'

const enhancer = applyMiddleware(thunk, routerMiddleware(hashHistory))

export default function configureStore (initialState) {
  return createStore(rootReducer, initialState, enhancer)
}
