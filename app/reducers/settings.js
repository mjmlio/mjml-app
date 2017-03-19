import { handleActions } from 'redux-actions'
import { Map, Set } from 'immutable'

const state = null

export default handleActions({

  SETTINGS_LOAD_SUCCESS: (state, { payload }) => {
    return Map({
      folders: Set(payload.folders),
    })
  },

  FOLDER_ADD: (state, { payload: path }) => state
    .update('folders', folders => folders.add(path)),

  FOLDER_REMOVE: (state, { payload: path }) => state
    .update('folders', folders => folders.remove(path)),

}, state)
