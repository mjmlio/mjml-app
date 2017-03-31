import React, { Component } from 'react'
import { connect } from 'react-redux'

import { isModalOpened, closeModal } from 'reducers/modals'

import Modal from 'components/Modal'
import Button from 'components/Button'

@connect(state => ({
  isOpened: isModalOpened(state, 'send'),
  settings: state.settings,
}), {
  closeModal,
})
class SendModal extends Component {

  state = {
    APIKey: '',
    APISecret: '',
  }

  componentWillMount () {
    this.setAPIState(this.props.settings)
  }

  handleClose = () => this.props.closeModal('send')

  handleChangeInput = key => e => this.setState({ [key]: e.target.value })

  setAPIState = settings => {
    this.setState({
      APIKey: settings.getIn(['api', 'key'], ''),
      APISecret: settings.getIn(['api', 'secret'], ''),
    })
  }

  render () {

    const {
      isOpened,
      settings,
    } = this.props

    const {
      APIKey,
      APISecret,
    } = this.props

    return (
      <Modal
        isOpened={isOpened}
        onClose={this.handleClose}
      >
        <div className='Modal--label'>
          {'Send'}
        </div>

        <div className='flow-v-20'>
          <div className='d-f ai-b'>
            <div style={{ width: 150 }} className='fs-0 t-small'>
              {'Mailjet API Key:'}
            </div>
            <input
              ref={n => this._firstInput = n}
              className='fg-1'
              value={APIKey}
              onChange={this.handleChangeInput('APIKey')}
              placeholder='Mailjet API Key'
              type='text'
            />
          </div>

          <div className='d-f ai-b'>
            <div style={{ width: 150 }} className='fs-0 t-small'>
              {'Mailjet API Secret:'}
            </div>
            <input
              className='fg-1'
              value={APISecret}
              onChange={this.handleChangeInput('APISecret')}
              placeholder='Mailjet API Secret'
              type='text'
            />
          </div>
        </div>

        <div className='ModalFooter'>
          <Button
            primary
            onClick={this.handleNext}
          >
            {'Send'}
          </Button>
          <Button
            transparent
            onClick={this.handleClose}
          >
            {'Cancel'}
          </Button>
        </div>
      </Modal>
    )
  }

}

export default SendModal
