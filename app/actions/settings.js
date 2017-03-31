import storage from 'electron-json-storage'

export function saveSettings () {
  return (dispatch, getState) => {
    // prevent blocking the main thread
    // for no reason
    window.requestIdleCallback(() => {
      const state = getState()
      const settings = state.settings.toJS()
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
