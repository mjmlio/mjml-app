import { createAction } from 'redux-actions'
import { fromJS } from 'immutable'
import { push } from 'react-router-redux'
import fetch from 'superagent'

const setConfig = createAction('SET_CONFIG')

/**
 * Load the config from localStorage. Empty localstorage if devmode
 */
export const loadConfig = () => (dispatch, getState) => {
  let localConfig = localStorage.getItem('appconfig')
  if (localConfig) {
    localConfig = JSON.parse(localConfig)

    // prevent wrong version to be stored in config
    delete localConfig.version

    const actualConfig = getState().config.toJS()
    const config = fromJS({ ...actualConfig, ...localConfig })
    dispatch(setConfig(config))
  }
}

export const dismissVersion = () => dispatch =>
  dispatch(updateConfig(config => config.set('hiddenVersion', config.get('lastVersion'))))

const configUpdate = createAction('UPDATE_CONFIG', updater => updater)

export const setFontSize = size => dispatch =>
  dispatch(updateConfig(config => config.set('fontSize', size)))

/**
 * Dispatch a config update
 *
 * @param {Function} updater
 */
export const updateConfig = updater => (dispatch, getState) => {
  dispatch(configUpdate(updater))
  const state = getState()
  localStorage.setItem('appconfig', JSON.stringify(state.config.toJS()))
}

/**
 * Check the latest mjml version
 */
export const fetchLastVersion = () => dispatch =>
  fetch('https://api.github.com/repos/mjmlio/mjml-app/releases/latest')
    .end((err, data) => err ? false : dispatch(updateConfig(config => config.set('lastVersion', data.body.tag_name))))

/**
 * Redirect to the comming soon page (used nowhere right now)
 */
export const comingSoon = () => dispatch =>
  dispatch(push('/coming-soon'))
