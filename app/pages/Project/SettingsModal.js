import React, { Component } from 'react'
import { connect } from 'react-redux'
import IconInfo from 'react-icons/md/settings'

import { isModalOpened, closeModal } from 'reducers/modals'

import Modal from 'components/Modal'

@connect(state => ({
  isOpened: isModalOpened(state, 'settings'),
}), {
  closeModal,
})
class SettingsModal extends Component {

  handleClose = () => this.props.closeModal('settings')

  render () {

    const {
      isOpened,
    } = this.props

    return (
      <Modal
        isOpened={isOpened}
        onClose={this.handleClose}
      >
        <div className='Modal--label'>
          {'Settings'}
        </div>
        <div className='d-f ai-fs'>
          <div className='fg-1 mr-20'>

            <h2 className='mb-20'>{'Editor'}</h2>

            <div>
              {'Wrap lines'}
            </div>

            <h2 className='mt-50 mb-20'>{'MJML'}</h2>

            <div>
              {'Wrap lines'}
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
