import { handleActions } from 'redux-actions'

const state = {
  l10n: {
    en: {}
  },
  activeLocale: 'en'
}

export default handleActions(
  {
    LOCALE_LOAD: (state, { payload: { l10n } }) => {
      return {
        ...state,
        l10n,
      }
    },
    LOCALE_SWITCH: (state, { payload: { activeLocale } }) => {
      return {
        ...state,
        activeLocale
      }
    },
  },
  state,
)

export function switchLocale(activeLocale) {
  return {
    type: 'LOCALE_SWITCH',
    payload: {
      activeLocale
    },
  }
}