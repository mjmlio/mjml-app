import { createAction } from 'redux-actions'
import { push } from 'react-router-redux'
import shortid from 'shortid'
import { Map } from 'immutable'
import mjml2html from 'mjml/lib/mjml2html'

import {
  readTemplates as fsReadTemplates,
  save
} from '../helpers/file-system'

import defaultContent from '../assets/defaultContent'

/**
 * Retrieve and set the list of templates
 */
const receiveTemplates = createAction('RECEIVE_TEMPLATES', templates => templates)
export const readTemplates = () => (dispatch, getState) => {
  const state = getState()
  const { config } = state

  fsReadTemplates(config.get('projectDirectory'))
    .then(templates => dispatch(receiveTemplates(templates)))
}

/**
 * Assign the template as current
 */
export const setTemplate = createAction('SET_TEMPLATE', template => template)

/**
 * Set a template as current, and navigate to it
 */
export const loadTemplate = (template) => dispatch => {
  dispatch(setTemplate(template))
  dispatch(push('editor'))
}

/**
 * Update the current template
 */
const doUpdateTemplate = createAction('UPDATE_TEMPLATE', updater => updater)
export const updateTemplate = updater => dispatch => {
  dispatch(doUpdateTemplate(template => {

    // update the template with updater
    let newTemplate = updater(template)

    // re-calculate mjml only if mjml has changed
    if (newTemplate.get('mjml') !== template.get('mjml')) {
      const html = mjml2html(newTemplate.get('mjml'))
      newTemplate = newTemplate.set('html', html)
    }

    // update modification date
    return newTemplate.set('modificationDate', new Date())
  }))
}

/**
 * Save current template to filesystem
 */
export const saveTemplate = () => (dispatch, getState) => {

  const state = getState()
  const { templates, config } = state

  const list = templates.get('list')
  const id = templates.get('current')
  const template = list.get(list.findIndex(
    template => template.get('id') === id
  ))

  save(template, config.get('projectDirectory'))
}

/**
 * Create a new template
 */
export const createNewTemplate = () => dispatch => {
  const now = new Date()
  const newTemplate = Map({
    id: shortid.generate(),
    name: 'no name',
    mjml: defaultContent,
    html: mjml2html(defaultContent),
    creationDate: now,
    modificationDate: now
  })
  dispatch(setTemplate(newTemplate))
  dispatch(saveTemplate())
  dispatch(push('editor'))
}
