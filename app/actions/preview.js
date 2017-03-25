import path from 'path'
import { createAction } from 'redux-actions'
import mjml2html from 'helpers/mjml'

import { fsReadFile } from 'helpers/fs'
import { updateProjectPreview } from 'actions/projects'

const setPrev = createAction('SET_PREVIEW')

export function setPreview (fileName, content = '') {
  return async dispatch => {

    if (!fileName) { return dispatch(setPrev(null)) }

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
    case '.mjml':
      if (!content) {
        content = await fsReadFile(fileName, { encoding: 'utf8' })
      }
      const html = await mjml2html(content)
      dispatch(setPrev({ type: 'html', content: html }))
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
