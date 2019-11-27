import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { hashRouter } from 'react-router-dom'
import { routerMiddleware } from 'react-router-redux'

import rootReducer from 'reducers'
import catchErrorsMiddleware from 'middlewares/catch-errors'

const router = routerMiddleware(hashRouter)

const middlewares = [catchErrorsMiddleware, thunk, router]

const enhancer = applyMiddleware(...middlewares)

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer) // eslint-disable-line
}
