import React, { Component } from 'react'
import { connect } from 'react-redux'
import IconInfo from 'react-icons/md/settings'

import { isModalOpened, closeModal } from 'reducers/modals'
import { updateSettings } from 'actions/settings'

import Modal from 'components/Modal'
import CheckBox from 'components/CheckBox'

import MJMLEngine from 'components/MJMLEngine'

@connect(state => ({
  isOpened: isModalOpened(state, 'settings'),
  settings: state.settings,
}), {
  closeModal,
  updateSettings,
})
class SettingsModal extends Component {

  handleClose = () => this.props.closeModal('settings')

  changeEditorSetting = key => val => {
    this.props.updateSettings(settings => settings.setIn(['editor', key], val))
  }

  render () {

    const {
      isOpened,
      settings,
    } = this.props

    const editorWrapLines = settings.getIn(['editor', 'wrapLines'], true)

    return (
      <Modal
        isOpened={isOpened}
        onClose={this.handleClose}
      >
        <div className='Modal--label'>
          {'Settings'}
        </div>
        <div className='d-f ai-fs'>
          <div className='fg-1 mr-20 flow-v-20'>

            <div>
              <h2 className='secondary mb-10'>{'MJML'}</h2>
              <MJMLEngine />
            </div>

            <div>
              <h2 className='secondary mb-10'>{'Editor'}</h2>

              <CheckBox value={editorWrapLines} onChange={this.changeEditorSetting('wrapLines')}>
                {'Wrap lines'}
              </CheckBox>
            </div>

          </div>
          <div style={{ width: 150 }}>
            <div className='version-box t-small flow-v-10'>

              <div className='d-f jc-c'>
                <IconInfo size={30} />
              </div>

              <div className='d-f ai-c'>
                <div className='fg-1'>
                  {'MJML App'}
                </div>
                <b className='c-white'>
                  {__MJML_APP_VERSION__}
                </b>
              </div>

              <div className='d-f ai-c'>
                <div className='fg-1'>
                  {'MJML'}
                </div>
                <b className='c-white'>
                  {__MJML_VERSION__}
                </b>
              </div>

            </div>
          </div>
        </div>
      </Modal>
    )
  }

}

export default SettingsModal
