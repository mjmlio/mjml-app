import { createAction } from 'redux-actions'

export const setTemplate = createAction('SET_TEMPLATE', template => template)
export const updateTemplate = createAction('UPDATE_TEMPLATE', updater => updater)
