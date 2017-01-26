import React, { Component } from 'react'
import { shell } from 'electron'
import { connect } from 'react-redux'

import Modal from 'components/Modal'
import Button from 'components/Button'

import 'styles/Frame.scss'

@connect(
  state => ({
    version: state.config.get('version'),
  })
)
class Frame extends Component {

  state = {
    isOpened: false,
  }

  openGithub () {
    shell.openExternal('https://github.com/mjmlio/mjml-app')
  }

  render () {
    const { isOpened } = this.state
    const { version } = this.props

    return (
      <div className='Frame'>
        <div className='Frame-center'>
          <div className='Frame-item'>
            {'mjml'}
          </div>
        </div>
        <div className='Frame-actions'>
          <div className='Frame-item Frame-about' onClick={() => this.setState({ isOpened: true })}>
            <i className='ion-information-circled' />
          </div>
        </div>
        <Modal isOpened={isOpened} onClose={() => this.setState({ isOpened: false })}>
          <p style={{ textAlign: 'center', fontSize: 40, marginBottom: 30 }}>
            {`v${version}`}
          </p>
          <p style={{ textAlign: 'center', fontSize: 15, marginBottom: 40 }}>
            {`mjml v${MJML_VERSION}`}
          </p>
          <p style={{ textAlign: 'center' }}>
            <Button className='primary' onClick={this.openGithub}>
              <i className='ion-social-github' style={{ marginRight: 5, fontSize: 20 }} />
              {'Source code'}
            </Button>
          </p>
        </Modal>
      </div>
    )
  }
}

export default Frame
