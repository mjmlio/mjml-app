import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable'

const state = fromJS({
  current: null,
  list: []
})

export default handleActions({

  // Receive the templates list
  RECEIVE_TEMPLATES: (state, { payload: list }) => state.set('list', list),

  // Assign the current template
  SET_TEMPLATE: (state, { payload: template }) => state.set('current', template.get('id')),

  // Update the current template
  UPDATE_TEMPLATE: (state, { payload: updater }) => {
    const currentList = state.get('list')
    const current = state.get('current')
    const index = currentList.findIndex(
      template => template.get('id') === current
    )
    const newList = currentList.update(index, template => updater(template))
    return state.set('list', newList)
  },

  // Reset the template to null
  RESET_TEMPLATE: state => state.set('current', null)

}, state)
