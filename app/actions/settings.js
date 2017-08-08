import storage from 'electron-json-storage'
import promisify from 'es6-promisify'
import defaultsDeep from 'lodash/defaultsDeep'
import omit from 'lodash/omit'

const storageGet = promisify(storage.get)

export function loadSettings() {
  return async dispatch => {
    const res = await storageGet('settings')
    const settings = defaultsDeep(res, {
      lastOpenedFolder: null,
      editor: {
        wrapLines: true,
        autoFold: false,
        foldLevel: 1,
        highlightTag: false,
        lightTheme: false,
      },
      mjml: {
        minify: false,
        beautify: false,
      },
      projects: [],
      api: {
        Subject: 'MJML App test email',
        APIKey: '',
        APISecret: '',
        SenderEmail: '',
        TargetEmails: [],
        LastEmails: [],
      },
      previewSize: {
        current: 500,
        mobile: 320,
        desktop: 650,
      },
    })

    // clean old format for TargetEmails
    if (settings.api.TargetEmail) {
      const updatedApiSettings = omit(settings.api, 'TargetEmail')
      settings.api = updatedApiSettings
    }

    dispatch({ type: 'SETTINGS_LOAD_SUCCESS', payload: settings })
  }
}

export function saveSettings() {
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

export function cleanBadProjects(pathsToClean) {
  return {
    type: 'PROJECTS_REMOVE',
    payload: pathsToClean,
  }
}

export function updateSettings(updater) {
  return dispatch => {
    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: updater,
    })
    dispatch(saveSettings())
  }
}

export function saveLastExportedFolder(path) {
  return dispatch => {
    dispatch(
      updateSettings(settings => {
        return settings.set('lastExportedFolder', path)
      }),
    )
  }
}

export function saveLastOpenedFolder(path) {
  return dispatch => {
    dispatch(
      updateSettings(settings => {
        return settings.set('lastOpenedFolder', path)
      }),
    )
  }
}

export function addToLastUsedEmails(emails) {
  return {
    type: 'ADD_TO_LAST_USED_EMAILS',
    payload: emails,
  }
}

export function removeFromLastUsedEmails(email) {
  return dispatch => {
    dispatch({
      type: 'REMOVE_FROM_LAST_USED_EMAILS',
      payload: email,
    })
    dispatch(saveSettings())
  }
}
