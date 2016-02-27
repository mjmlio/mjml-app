import { createAction } from 'redux-actions'

import { save } from '../helpers/file-system'

export const setTemplate = createAction('SET_TEMPLATE', template => template)
export const updateTemplate = createAction('UPDATE_TEMPLATE', updater => updater)

export const saveTemplate = () => (dispatch, getState) => {
  const state = getState()
  const { template, config } = state

  save(template, config.get('projectDirectory'))
}
