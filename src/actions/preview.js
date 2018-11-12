import path from 'path'
import { createAction } from 'redux-actions'

import mjml2html from 'helpers/mjml'
import lokalise from 'helpers/lokalise'
import { fsReadFile } from 'helpers/fs'
import { updateProjectPreview } from 'actions/projects'

const setPrev = createAction('SET_PREVIEW')

export function getPreview(fileName, content = '', locale) {
  return async (dispatch, getState) => {
    const state = getState()
    const { settings, l10n: { l10n, activeLocale } } = state

    // eventually get the custom mjml path set in settings
    const mjmlManual = settings.getIn(['mjml', 'engine']) === 'manual'
    const mjmlPath = mjmlManual ? settings.getIn(['mjml', 'path']) : undefined

    if (!content) {
      content = await fsReadFile(fileName, { encoding: 'utf8' })
    }

    const renderOpts = {
      minify: settings.getIn(['mjml', 'minify']),
    }

    const { html, errors } = await mjml2html(content, fileName, mjmlPath, renderOpts)

    locale = locale || activeLocale

    return {
      preview: lokalise(html, l10n[locale]),
      errors
    }
  }
}

export function setPreview(fileName, content = '') {
  return async (dispatch) => {
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
      case '.jpg':
      case '.png':
      case '.gif':
        dispatch(setPrev({ type: 'image', content: fileName }))
        break
      case '.mjml': // eslint-disable-line no-case-declarations
        const { preview, errors } = await dispatch(getPreview(fileName, content))

        dispatch(setPrev({ type: 'html', content: preview, errors, fileNale: bName }))

        // update the preview in project
        if (bName === 'index.mjml') {
          dispatch(updateProjectPreview(fName, preview))
        }
        break
      default:
        dispatch(setPrev(null))
    }
  }
}
