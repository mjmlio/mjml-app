import path from 'path'
import { createAction } from 'redux-actions'

import mjml2html from 'helpers/mjml'
import lokalise from 'helpers/lokalise'
import { fsReadFile } from 'helpers/fs'
import { updateProjectPreview } from 'actions/projects'

const setPrev = createAction('SET_PREVIEW')

export function getPreview(fileName, content = '', locale, minify = false) {
  return async (dispatch, getState) => {
    const state = getState()
    const { settings, l10n: { l10n, activeLocale } } = state

    // eventually get the custom mjml path set in settings
    const mjmlManual = settings.getIn(['mjml', 'engine']) === 'manual'
    const mjmlPath = mjmlManual ? settings.getIn(['mjml', 'path']) : undefined
    // const projectPath = settings.getIn(['lastOpenedFolder'])

    if (!content) {
      content = await fsReadFile(fileName, { encoding: 'utf8' })
    }

    const renderOpts = {
      minify: minify || settings.getIn(['mjml', 'minify']),
      filePath: path.resolve('src/mail-templates/src/components'),
      mjmlConfigPath: path.resolve('src/mail-templates/src/components'),
    }

    const { html, errors } = await mjml2html(content, fileName, mjmlPath, renderOpts)

    locale = locale || activeLocale

    return {
      preview: lokalise(html, l10n[locale]),
      errors,
    }
  }
}

export function getJsonPreview(fileName, data = '', locale, minify = false) {
  return async (dispatch, getState) => {
    const state = getState()
    const { settings, l10n: { l10n, activeLocale } } = state

    // eventually get the custom mjml path set in settings
    const mjmlManual = settings.getIn(['mjml', 'engine']) === 'manual'
    const mjmlPath = mjmlManual ? settings.getIn(['mjml', 'path']) : undefined

    if (!data) {
      data = await fsReadFile(fileName, { encoding: 'utf8' })
    }

    data = JSON.parse(data)

    // TODO: find a way to chose dynamic path to templates
    // const template = await import('' + projectPath + '/layouts/' + data.template + '.js')
    // const template = await import('../mail-templates/src/' + data.template + '.js')
    const template = await import('../mail-templates/src/components/template.js')

    const content = template({ ...data.data })

    const renderOpts = {
      minify: minify || settings.getIn(['mjml', 'minify']),
      filePath: path.resolve('src/mail-templates/src/components'),
      mjmlConfigPath: path.resolve('src/mail-templates/src/components'),
    }

    const { html, errors } = await mjml2html(content, fileName, mjmlPath, renderOpts)

    locale = locale || activeLocale

    return {
      preview: lokalise(html, l10n[locale]),
      errors,
    }
  }
}

export function setPreview(fileName, content = '') {
  return async dispatch => {
    if (!fileName) {
      return dispatch(setPrev(null))
    }

    const bName = path.basename(fileName)
    const fName = path.dirname(fileName)
    const ext = path.extname(fileName)

    switch (ext) {
      case '.html':
        if (!content) {
          content = await fsReadFile(fileName, { encoding: 'utf8' })
        }
        dispatch(setPrev({ type: 'html', content }))
        break
      case '.json': {
        const { preview, errors } = await dispatch(getJsonPreview(fileName, content))

        dispatch(setPrev({ type: 'html', content: preview, errors, fileNale: bName }))

        // update the preview in project
        if (bName === 'index.mjml') {
          dispatch(updateProjectPreview(fName, preview))
        }
        break
      }
      case '.jpg':
      case '.png':
      case '.gif':
        dispatch(setPrev({ type: 'image', content: fileName }))
        break
      case '.mjml': {
        const { preview, errors } = await dispatch(getPreview(fileName, content))

        dispatch(setPrev({ type: 'html', content: preview, errors, fileNale: bName }))

        // update the preview in project
        if (bName === 'index.mjml') {
          dispatch(updateProjectPreview(fName, preview))
        }
        break
      }
      default:
        dispatch(setPrev(null))
    }
  }
}
