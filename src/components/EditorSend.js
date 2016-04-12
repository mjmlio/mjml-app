import React, { Component } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'

import Modal from './Modal'
import Button from './Button'
import { updateConfig } from '../actions'
import { send } from '../actions/send'

@connect(
  state => ({
    config: state.config,
  })
)
class EditorSend extends Component {

  state = {
    modalOpened: false,
  }

  /**
   * Opens the configuration modal
   *
   * @returns {undefined}
   */
  openModal = () => this.setState({ modalOpened: true })

  /**
   * Closes the config modal
   *
   * @returns {undefined}
   */
  closeModal = () => this.setState({ modalOpened: false })

  /**
   * Check the send config validity (it should not be empty ATM)
   *
   * @returns {Boolean} true/false
   */
  isValid () {
    const { config } = this.props
    return !!config.get('mjApiKey')
      && !!config.get('mjApiSecret')
      && !!config.get('userEmail')
      && !!config.get('sendTo')
  }

  /**
   * Update a config entry
   *
   * @param {String} key the config entry to be updated
   * @param {Object} e the event to get the field value
   * @returns {undefined}
   */
  updateInConf = (key, e) => {
    const { value } = e.target
    this.props.dispatch(
      updateConfig(config => config.set(key, value))
    )
  }

  /**
   * Sends a test email using mailjet and closes the modal
   *
   * @param {Object} e the triggered event
   * @returns {undefined}
   */
  sendEmail = e => {
    e.preventDefault()
    this.props.dispatch(
      send(this.props.template.get('html'))
    )
    this.closeModal()
  }

  render () {
    const { config } = this.props
    const { modalOpened } = this.state

    return (
      <Button
        onClick={this.openModal}
        className={cx('EditorPage-bar-item', { active: modalOpened })}>

        <i className='ion-ios-navigate bar-icon' />

        {'Send'}

        <Modal isOpened={modalOpened} onClose={this.closeModal}>

          <h1>{'Send a test email'}</h1>

          <form onSubmit={this.sendEmail}>

            <div className='form-group'>
              <label>{'Mailjet API Key:'}</label>
              <p style={{ fontSize: '.9em' }}>You can find your API Keys in the <a href='https://app.mailjet.com/account/api_keys'>Account/API Key section</a></p>
              <input
                type='text'
                value={config.get('mjApiKey')}
                onChange={this.updateInConf.bind(this, 'mjApiKey')}
                placeholder='Mailjet API Key' />
            </div>
            <div className='form-group'>
              <label>{'Mailjet API Secret:'}</label>
              <input
                type='text'
                value={config.get('mjApiSecret')}
                onChange={this.updateInConf.bind(this, 'mjApiSecret')}
                placeholder='Mailjet API Secret' />
            </div>
            <div className='form-group'>
              <label>{'From email:'}</label>
              <p style={{ fontSize: '.9em' }}>The from email must be a <a href='https://app.mailjet.com/account/sender'>verified sender</a></p>
              <input
                type='text'
                value={config.get('userEmail')}
                onChange={this.updateInConf.bind(this, 'userEmail')}
                placeholder='From' />
            </div>
            <div className='form-group'>
              <label>{'To email:'}</label>
              <input
                type='text'
                value={config.get('sendTo')}
                onChange={this.updateInConf.bind(this, 'sendTo')}
                placeholder='To' />
            </div>
            <div className='form-group' style={{
              opacity: this.isValid() ? 1 : 0.4,
            }}>
              <button type='submit' className='Button primary' disabled={!this.isValid()}>
                {'Send'}
              </button>
            </div>

          </form>

        </Modal>

      </Button>
    )
  }

}

export default EditorSend
