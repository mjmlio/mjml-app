import { createAction } from 'redux-actions'

import { readTemplates as fsReadTemplates } from '../helpers/file-system'

const receiveTemplates = createAction('RECEIVE_TEMPLATES', templates => templates)

export const readTemplates = () => (dispatch, getState) => {
  const state = getState()
  const { config } = state

  fsReadTemplates(config.get('projectDirectory'))
    .then(templates => dispatch(receiveTemplates(templates)))
}
