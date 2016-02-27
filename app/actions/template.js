import { createAction } from 'redux-actions'
import { push } from 'react-router-redux'
import shortid from 'shortid'
import { Map } from 'immutable'
import mjml2html from 'mjml/lib/mjml2html'

import { save } from '../helpers/file-system'
import defaultContent from '../assets/defaultContent'

export const setTemplate = createAction('SET_TEMPLATE', template => template)
export const updateTemplate = createAction('UPDATE_TEMPLATE', updater => updater)

export const saveTemplate = () => (dispatch, getState) => {
  const state = getState()
  const { template, config } = state

  const html = mjml2html(template.get('mjml'))
  save(
    template.set('html', html),
    config.get('projectDirectory')
  )
}

export const createNewTemplate = () => dispatch => {
  const newTemplate = Map({
    id: shortid.generate(),
    name: 'no name',
    mjml: defaultContent,
    html: mjml2html(defaultContent),
    creationDate: new Date()
  })
  dispatch(setTemplate(newTemplate))
  dispatch(saveTemplate())
  dispatch(push('editor'))
}

export const loadTemplate = (template) => dispatch => {
  dispatch(setTemplate(template))
  dispatch(push('editor'))
}
