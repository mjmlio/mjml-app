import { createAction } from 'redux-actions'
import { push } from 'react-router-redux'
import shortid from 'shortid'
import { Map } from 'immutable'
import mjml2html from 'mjml/lib/mjml2html'
import { remote } from 'electron'

const dialog = remote.require('dialog')

import {
  readTemplates as fsReadTemplates,
  readTemplate,
  save,
  readFile,
  writeFile,
  deleteTemplate as fsDeleteTemplate
} from '../helpers/file-system'

import defaultContent from '../assets/defaultContent'

/**
 * Retrieve and set the list of templates
 */
const receiveTemplates = createAction('RECEIVE_TEMPLATES', templates => templates)
export const readTemplates = () => (dispatch, getState) => {
  const state = getState()
  const { config } = state

  return fsReadTemplates()
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
 * Template update utilities
 */
const doUpdateTemplate = createAction('UPDATE_TEMPLATE')
const doUpdateCurrentTemplate = createAction('UPDATE_CURRENT_TEMPLATE', updater => updater)

/**
 * Update the current template
 */
export const updateCurrentTemplate = updater => dispatch => {
  dispatch(doUpdateCurrentTemplate(template => {

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
const templateCreated = createAction('TEMPLATE_CREATED')
export const createNewTemplate = (mjml = defaultContent) => dispatch => {
  const now = new Date()
  const newTemplate = Map({
    id: shortid.generate(),
    name: 'no name',
    mjml: mjml,
    html: mjml2html(mjml),
    creationDate: now,
    modificationDate: now
  })
  dispatch(templateCreated(newTemplate))
  dispatch(setTemplate(newTemplate))
  dispatch(saveTemplate())
  dispatch(push('editor'))
}

/**
 * Delete a template
 */
const templateDeleted = createAction('TEMPLATE_DELETED')
export const deleteTemplate = template => (dispatch, getState) => {
  const state = getState()
  const { config } = state
  const id = template.get('id')
  dispatch(templateDeleted(id))
  fsDeleteTemplate(id)
}

/**
 * Show the Open dialog window and load an MJML file
 */
export const open = () => dispatch => {
  dialog.showOpenDialog((filenames) => {
    if (!filenames) { return }
    readFile(filenames[0])
      .then(content => dispatch(createNewTemplate(content)))
  })
}

/*
 * Show the save dialog window to export the template as an MJML file
 */
export const exportTemplate = template => (dispatch) => {
  dialog.showSaveDialog((filename) => {
    if (!filename) { return }
    writeFile(filename, template.get('mjml'))
  })
}

/**
 * Create a snapshot of a template
 */
export const makeSnapshot = template => dispatch => {
  const id = template.get('id')
  dispatch(doUpdateTemplate({ id, updater: template => template.set('thumbnailLoading', true) }))

  remote.require('./services').takeSnapshot(template.get('id'), template.get('html'), () => {
    dispatch(doUpdateTemplate({ id, updater: template => template.set('thumbnailLoading', false) }))
  })
}
