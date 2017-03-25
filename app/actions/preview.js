import path from 'path'
import { createAction } from 'redux-actions'
import mjml2html from 'helpers/mjml'

import { updateProjectPreview } from 'actions/projects'

const setPrev = createAction('SET_PREVIEW')

export function setPreview (type, fullPath = '', content = '') {
  return async dispatch => {
    const bName = path.basename(fullPath)
    const fName = path.dirname(fullPath)
    switch (type) {
    case 'html':
      dispatch(setPrev({
        type: 'html',
        content,
      }))
      break
    case 'mjml':
      const html = await mjml2html(content)
      dispatch(setPrev({
        type: 'html',
        content: html,
      }))
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
