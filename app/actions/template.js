import { createAction } from 'redux-actions'
import { push } from 'react-router-redux'
import shortid from 'shortid'
import { Map } from 'immutable'

import { save } from '../helpers/file-system'
import defaultContent from '../assets/defaultContent'

export const setTemplate = createAction('SET_TEMPLATE', template => template)
export const updateTemplate = createAction('UPDATE_TEMPLATE', updater => updater)

export const saveTemplate = () => (dispatch, getState) => {
  const state = getState()
  const { template, config } = state

  save(template, config.get('projectDirectory'))
}

export const createNewTemplate = () => dispatch => {
  const newTemplate = Map({
    id: shortid.generate(),
    name: 'no name',
    mjml: defaultContent
  })
  dispatch(setTemplate(newTemplate))
  dispatch(saveTemplate())
  dispatch(push('editor'))
}

export const loadTemplate = (template) => dispatch => {
  dispatch(setTemplate(template))
  dispatch(push('editor'))
}
