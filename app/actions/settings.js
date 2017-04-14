import storage from 'electron-json-storage'
import promisify from 'es6-promisify'
import defaultsDeep from 'lodash/defaultsDeep'

const storageGet = promisify(storage.get)

export function loadSettings () {
  return async dispatch => {
    const res = await storageGet('settings')
    const settings = defaultsDeep(res, {
      editor: {},
      projects: [],
      api: {},
      previewSize: {
        current: 500,
        mobile: 320,
        desktop: 650,
      },
    })
    try {
      dispatch({ type: 'SETTINGS_LOAD_SUCCESS', payload: settings })
    } catch (e) {
      dispatch({ type: 'SETTINGS_RESET' })
      dispatch(saveSettings())
    }
  }
}

export function saveSettings () {
  return (dispatch, getState) => {
    // prevent blocking the main thread
    // for no reason
    window.requestIdleCallback(() => {
      const state = getState()
      const settings = state.settings.toJS()
      dispatch({
        type: 'SAVE_SETTINGS',
        payload: settings,
      })
      storage.set('settings', settings)
    })
  }
}

export function cleanBadProjects (pathsToClean) {
  return {
    type: 'PROJECTS_REMOVE',
    payload: pathsToClean,
  }
}

export function updateSettings (updater) {
  return (dispatch) => {
    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: updater,
    })
    dispatch(saveSettings())
  }
}
