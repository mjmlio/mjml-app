import React, { Component } from 'react'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'
import IconInfo from 'react-icons/md/info'
import { shell } from 'electron'

import sendEmail from 'helpers/sendEmail'

import { isModalOpened, closeModal } from 'reducers/modals'
import { addAlert } from 'reducers/alerts'
import { updateSettings } from 'actions/settings'

import Modal from 'components/Modal'
import Button from 'components/Button'

@connect(state => {
  return {
    isOpened: isModalOpened(state, 'send'),
    APIKey: state.settings.getIn(['api', 'APIKey'], ''),
    APISecret: state.settings.getIn(['api', 'APISecret'], ''),
    SenderEmail: state.settings.getIn(['api', 'SenderEmail'], ''),
    TargetEmail: state.settings.getIn(['api', 'TargetEmail'], ''),
  }
}, {
  addAlert,
  closeModal,
  updateSettings,
})
class SendModal extends Component {

  state = {
    APIKey: '',
    APISecret: '',
    SenderEmail: '',
    TargetEmail: '',
  }

  componentWillMount () {
    this.setAPIState(this.props)
  }

  componentWillReceiveProps (nextProps) {
    const didOpened = !this.props.isOpened && nextProps.isOpened
    if (didOpened) {
      this.setAPIState(nextProps)
    }
  }

  handleClose = () => this.props.closeModal('send')

  handleChangeInput = key => e => {
    this.setState({ [key]: e.target.value })
    this.debounceSaveInConfig()
  }

  handleSubmit = async e => {
    e.stopPropagation()
    e.preventDefault()

    const {
      addAlert,
    } = this.props

    const {
      APIKey,
      APISecret,
      SenderEmail,
      TargetEmail,
    } = this.state

    try {
      await sendEmail({
        content: 'coucou',
        APIKey,
        APISecret,
        SenderEmail,
        TargetEmail,
      })
      window.requestIdleCallback(() => addAlert('Mail has been sent', 'success'))
      window.requestIdleCallback(this.handleClose)
    } catch (e) { // eslint-disable-line
      addAlert('Something went wrong', 'error')
    }
  }

  setAPIState = props => {
    this.setState({
      APIKey: props.APIKey,
      APISecret: props.APISecret,
      SenderEmail: props.SenderEmail,
      TargetEmail: props.TargetEmail,
    })
  }

  debounceSaveInConfig = debounce(() => {
    this.props.updateSettings(settings => {
      return settings
        .setIn(['api', 'APIKey'], this.state.APIKey)
        .setIn(['api', 'APISecret'], this.state.APISecret)
        .setIn(['api', 'SenderEmail'], this.state.SenderEmail)
        .setIn(['api', 'TargetEmail'], this.state.TargetEmail)
    })
  }, 1e3)

  render () {

    const {
      isOpened,
    } = this.props

    const {
      APIKey,
      APISecret,
      SenderEmail,
      TargetEmail,
    } = this.state

    const isValid = !!APIKey && !!APISecret && !!SenderEmail && !!TargetEmail

    return (
      <Modal
        isOpened={isOpened}
        onClose={this.handleClose}
      >
        <div className='Modal--label'>
          {'Send'}
        </div>

        <form className='flow-v-20' onSubmit={this.handleSubmit}>
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

          <div className='d-f ai-b'>
            <div style={{ width: 150 }} className='fs-0 t-small'>
              {'Target Email:'}
            </div>
            <input
              className='fg-1'
              value={TargetEmail}
              onChange={this.handleChangeInput('TargetEmail')}
              placeholder='Target Email'
              type='text'
            />
          </div>

          <div className='d-f ai-b'>
            <div style={{ width: 150 }} className='fs-0 t-small'>
              {'Sender Email:'}
            </div>
            <div className='d-f fd-c fg-1'>
              <input
                value={SenderEmail}
                onChange={this.handleChangeInput('SenderEmail')}
                placeholder='Sender Email'
                type='text'
              />
              <div className='t-small mt-10 ta-r d-f ai-c flow-h-5'>
                <IconInfo />
                <div>
                  {'Must be a verified sender. '}
                </div>
                <div
                  className='a white'
                  onClick={() => shell.openExternal('https://app.mailjet.com/account/sender')}
                >
                  {'Learn more'}
                </div>
              </div>
            </div>
          </div>
          <input type='submit' style={{ display: 'none' }} />
        </form>

        <div className='ModalFooter'>
          <Button
            primary
            onClick={this.handleSubmit}
            disabled={!isValid}
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
