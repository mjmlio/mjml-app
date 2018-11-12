import path from 'path'
import { createAction } from 'redux-actions'

import mjml2html from 'helpers/mjml'
import lokalise from 'helpers/lokalise'
import { fsReadFile } from 'helpers/fs'
import { updateProjectPreview } from 'actions/projects'

const setPrev = createAction('SET_PREVIEW')

export function setPreview(fileName, content = '') {
  return async (dispatch, getState) => {
    if (!fileName) {
      return dispatch(setPrev(null))
    }

    const bName = path.basename(fileName)
    const fName = path.dirname(fileName)
    const ext = path.extname(fileName)

    const state = getState()
    const { settings, l10n: { l10n, activeLocale} } = state

    // eventually get the custom mjml path set in settings
    const mjmlManual = settings.getIn(['mjml', 'engine']) === 'manual'
    const mjmlPath = mjmlManual ? settings.getIn(['mjml', 'path']) : undefined

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
        if (!content) {
          content = await fsReadFile(fileName, { encoding: 'utf8' })
        }
        const renderOpts = {
          minify: settings.getIn(['mjml', 'minify']),
        }

        const { html, errors } = await mjml2html(content, fileName, mjmlPath, renderOpts)

        const lokalisedHtml = lokalise(html, l10n[activeLocale])

        dispatch(setPrev({ type: 'html', content: lokalisedHtml, errors }))
        // update the preview in project
        if (bName === 'index.mjml') {
          dispatch(updateProjectPreview(fName, html))
        }
        break
      default:
        dispatch(setPrev(null))
    }
  }
}
