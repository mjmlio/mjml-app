import { handleActions } from 'redux-actions'

/*

template is an Immutable Map and will look like:

  name       string    the name
  mjml       string    the mjml content

*/

const initialState = null

export default handleActions({

  // Assign the current template
  SET_TEMPLATE: (state, { payload: template }) => template,

  // Update the current template
  UPDATE_TEMPLATE: (state, { payload: updater }) => updater(state),

  // Reset the template to null
  RESET_TEMPLATE: () => null

}, initialState)
