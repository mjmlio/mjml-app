
import { updateConfig } from './index'
import { push } from 'react-router-redux'

/**
 * Creates the Ace editor compilant shortcuts. Cmd+P: toggle preview, cmd+b => home
 *
 * @param {Function} register Ace register function
 * @param {Function} dispatch store.dispatch
 * @returns {undefined} nothing
 */
export const registerShortcuts = (register) => dispatch => {
  register({
    name: 'toggle:preview',
    bindKey: { mac: 'Cmd+p' },
    readOnly: true,
    exec () {
      dispatch(updateConfig(
        config => config.set('editorShowPreview', !config.get('editorShowPreview'))
      ))
    },
  })

  register({
    name: 'goto:home',
    bindKey: { mac: 'Cmd+b' },
    readOnly: true,
    exec () {
      dispatch(push('/browse/templates'))
    },
  })
}
