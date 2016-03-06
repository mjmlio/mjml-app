import { push } from 'react-router-redux'

import { checkAndCreateAppFolders } from './helpers/file-system'
import { readTemplates } from './actions/templates'
import { loadConfig } from './actions'

/**
 * Init the app
 * All pre-1rst-render operations should be here
 */
export default ({ dispatch }) => Promise.all([

  // go to browse recent, because react-router :'(
  // TODO: find a solution
  dispatch(push('/browse/recent')),

  // TODO: we should get rid of this
  checkAndCreateAppFolders(),

  // load user config.
  // TODO: merge with defaults instead of overriding
  dispatch(loadConfig()),

  // load all user templates
  // TODO: db?
  dispatch(readTemplates())

])
