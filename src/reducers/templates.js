import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable'

const state = fromJS({
  current: null,
  list: [],
})

export default handleActions({

  // Receive the templates list
  RECEIVE_TEMPLATES: (state, { payload: list }) => state.set('list', list),

  // Assign the current template
  SET_TEMPLATE: (state, { payload: template }) => state.set('current', template.get('id')),

  // Update the current template
  UPDATE_CURRENT_TEMPLATE: (state, { payload: updater }) => {
    const currentList = state.get('list')
    const current = state.get('current')
    const index = currentList.findIndex(
      template => template.get('id') === current
    )
    const newList = currentList.update(index, template => updater(template))
    return state.set('list', newList)
  },

  // Update a template based on its id
  UPDATE_TEMPLATE: (state, { payload: { id, updater } }) =>
    state.updateIn(['list', state.get('list').findIndex(t => t.get('id') === id)], updater),

  // Reset the template to null
  RESET_TEMPLATE: state => state.set('current', null),

  // Push a new template
  TEMPLATE_CREATED: (state, { payload: template }) =>
    state.set('list', state.get('list').unshift(template)),

  // Delete a template from list
  TEMPLATE_DELETED: (state, { payload: id }) =>
    state.set('list', state.get('list').delete(state.get('list').findIndex(t => t.get('id') === id))),

}, state)
