import path from 'path'

import { createOrEmpty, fsWriteFile } from 'helpers/fs'

import { openProject } from 'actions/projects'
import { addAlert } from 'reducers/alerts'

export default function createFromGallery(location, MJMLContent) {
  return async dispatch => {
    try {
      await createOrEmpty(location)
      const fileLocation = path.join(location, 'index.mjml')
      await fsWriteFile(fileLocation, MJMLContent)
      dispatch(openProject(location))
    } catch (err) {
      dispatch(addAlert(err.message || err, 'error'))
    }
  }
}
