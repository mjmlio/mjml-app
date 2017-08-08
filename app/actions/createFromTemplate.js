import path from 'path'

import { createOrEmpty, fsWriteFile } from 'helpers/fs'

import { openProject } from 'actions/projects'
import { addAlert } from 'reducers/alerts'

export default function createFromTemplate(location, template) {
  return async dispatch => {
    try {
      await createOrEmpty(location)
      await template.files.map(async file => {
        const fileLocation = path.join(location, file.name)
        await fsWriteFile(fileLocation, file.content)
      })
      dispatch(openProject(location))
    } catch (err) {
      dispatch(addAlert(err.message || err, 'error'))
    }
  }
}
