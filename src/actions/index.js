import { createAction } from 'redux-actions'
import { fromJS } from 'immutable'
import { push } from 'react-router-redux'

const setConfig = createAction('SET_CONFIG')

export const loadConfig = () => (dispatch, getState) => {
  if (process.env.NODE_ENV === 'development') {
    localStorage.clear()
  }
  const localConfig = localStorage.getItem('appconfig')
  if (localConfig) {
    const actualConfig = getState().config.toJS()
    const config = fromJS({ ...actualConfig, ...JSON.parse(localConfig) })
    dispatch(setConfig(config))
  }
}

const configUpdate = createAction('UPDATE_CONFIG', updater => updater)
export const updateConfig = updater => (dispatch, getState) => {
  dispatch(configUpdate(updater))
  const state = getState()
  localStorage.setItem('appconfig', JSON.stringify(state.config.toJS()))
}

export const comingSoon = () => dispatch =>
  dispatch(push('/coming-soon'))
