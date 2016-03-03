
import { updateConfig } from './index'
import { push } from 'react-router-redux'

export const registerShortcuts = (register) => dispatch => {
  register({
    name: 'toggle:preview',
    bindKey: { mac: 'Cmd+h' },
    readOnly: true,
    exec () {
      dispatch(updateConfig(
        config => config.set('editorShowPreview', !config.get('editorShowPreview'))
      ))
    }
  })

  register({
    name: 'goto:home',
    bindKey: { mac: 'Cmd+y' },
    readOnly: true,
    exec () {
      dispatch(push('/browse/recent'))
    }
  })
}
