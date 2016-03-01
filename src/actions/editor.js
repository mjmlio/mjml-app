
import { updateConfig } from './index'

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
}
