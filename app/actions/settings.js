import storage from 'electron-json-storage'

export function saveSettings () {
  return (dispatch, getState) => {
    const state = getState()
    const settings = state.settings.toJS()
    storage.set('settings', settings)
  }
}
