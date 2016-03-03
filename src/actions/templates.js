import { createAction } from 'redux-actions'
import { push } from 'react-router-redux'
import shortid from 'shortid'
import { Map } from 'immutable'
import mjml2html from 'mjml/lib/mjml2html'
import { remote } from 'electron'
import { error, notify } from '../helpers/notification'

const dialog = remote.require('dialog')

import {
  readTemplates as fsReadTemplates,
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
export const readTemplates = () => dispatch => {
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
      try {
        const html = mjml2html(newTemplate.get('mjml'))
        newTemplate = newTemplate.set('html', html)
      } catch (e) {
        // notification
        newTemplate = newTemplate.set('html', '')
      }
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

  const cleaned = template
    .delete('thumbnailLoading')

  save(cleaned, config.get('projectDirectory'))
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
    mjml,
    html: mjml2html(mjml),
    creationDate: now,
    modificationDate: now
  })
  dispatch(templateCreated(newTemplate))
  dispatch(setTemplate(newTemplate))
  dispatch(saveTemplate())
  dispatch(makeSnapshot(newTemplate))
  dispatch(push('editor'))
}

/**
 * Delete a template
 */
const templateDeleted = createAction('TEMPLATE_DELETED')
export const deleteTemplate = template => dispatch => {
  const id = template.get('id')
  dispatch(templateDeleted(id))
  fsDeleteTemplate(id)
    .then(() => notify('Deleted!'))
    .catch(() => error('Not Deleted!'))
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
export const exportTemplate = ({ template, type }) => () => {
  dialog.showSaveDialog((filename) => {
    if (!filename) { return }
    writeFile(filename, template.get(type))
      .then(() => notify('Saved!'))
      .catch(() => error('Not Saved!'))
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
