import { push } from 'react-router-redux'

import { checkAndCreateAppFolders } from './helpers/file-system'
import { readTemplates } from './actions/templates'
import { loadConfig } from './actions'
import createPresetsThumbnails from './helpers/createPresetsThumbnails'

if (process.env.NODE_ENV === 'development') {
  localStorage.clear()
}

/**
 * Init the app
 * All pre-1rst-render operations should be here
 */
export default ({ dispatch }) =>

  // TODO: we should get rid of this
  checkAndCreateAppFolders()

    // create the presets thumbnails...
    .then(() => createPresetsThumbnails())

    // load user config.
    // TODO: merge with defaults instead of overriding
    .then(() => dispatch(loadConfig()))

    // load all user templates
    // TODO: db?
    .then(() => dispatch(readTemplates()))

    // go to browse recent, because react-router :'(
    // TODO: find a solution
    .then(() => dispatch(push('/browse/templates')))
