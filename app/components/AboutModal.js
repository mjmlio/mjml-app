import React, { Component } from 'react'
import { connect } from 'react-redux'

import { isModalOpened, closeModal } from 'reducers/modals'

import Modal from 'components/Modal'

@connect(
  state => ({
    isOpened: isModalOpened(state, 'about'),
  }),
  {
    closeModal,
  },
)
class AboutModal extends Component {
  render() {
    const { isOpened, closeModal } = this.props
    return (
      <Modal
        isOpened={isOpened}
        onClose={() => closeModal('about')}
        style={{
          width: 300,
        }}
        className="flow-v-10"
      >
        <div>
          {'MJML App v'}
          <b className="us-t">
            {__MJML_APP_VERSION__}
          </b>
        </div>
        <div>
          {'MJML v'}
          <b className="us-t">
            {__MJML_VERSION__}
          </b>
        </div>
      </Modal>
    )
  }
}

export default AboutModal
