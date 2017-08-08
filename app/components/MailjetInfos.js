import React, { Component } from 'react'
import Collapse from 'react-collapse'
import { shell } from 'electron'

import IconInfo from 'react-icons/md/info'
import LogoMailjet from 'components/icons/logo-mailjet'

class MailjetInfos extends Component {
  state = {
    isOpened: (({ APIKey, APISecret, SenderEmail }) => !APIKey || !APISecret || !SenderEmail)(
      this.props,
    ),
  }

  handleOpenInfos = e => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({ isOpened: true })
  }

  handleChangeInput = key => e => {
    this.props.onChange(key, e.target.value.trim())
  }

  handleGoToMailjet = e => {
    e.preventDefault()
    e.stopPropagation()
    shell.openExternal('https://app.mailjet.com/signup')
  }

  render() {
    const { SenderEmail, APIKey, APISecret } = this.props

    const { isOpened } = this.state

    return (
      <div className="brand">
        <Collapse isOpened={!isOpened} springConfig={{ stiffness: 300, damping: 30 }}>
          <div className="d-f ai-c p-20">
            <div className="d-f ai-c jc-c" style={{ background: 'rgba(white, 0.1)' }}>
              <LogoMailjet height={30} className="mr-20" />
              <div className="mr-10 t-small" style={{ lineHeight: '18px' }}>
                <span>
                  {'Sending from '}
                  <b className="us-t ff-m">
                    {SenderEmail}
                  </b>
                </span>
                <br />
                <span>
                  {'Using API Key '}
                  <b className="us-t ff-m">
                    {APIKey}
                  </b>
                </span>
                <br />
                <a href="" className="a c-blue t-small" onClick={this.handleOpenInfos}>
                  {'Edit informations'}
                </a>
              </div>
            </div>
          </div>
        </Collapse>

        <Collapse isOpened={isOpened} springConfig={{ stiffness: 300, damping: 30 }}>
          <div className="p-20">
            <div className="mb-20 d-f ai-c">
              <LogoMailjet height={20} className="mr-20 anim-mailjet" />
              <div className="t-small" style={{ lineHeight: '18px' }}>
                <span className="c-white">
                  {'MJML App uses the Mailjet API to send emails. '}
                </span>
                <a href="" onClick={this.handleGoToMailjet} className="a white">
                  {'Create your account'}
                </a>
              </div>
            </div>
            <div className="flow-v-20">
              <div className="d-f ai-b">
                <div style={{ width: 150 }} className="fs-0 t-small">
                  {!APIKey &&
                    <span className="red-star">
                      {'*'}
                    </span>}
                  {'Mailjet API Key:'}
                </div>
                <input
                  ref={n => (this._firstInput = n)}
                  className="fg-1"
                  value={APIKey}
                  onChange={this.handleChangeInput('APIKey')}
                  placeholder="Mailjet API Key"
                  type="text"
                />
              </div>

              <div className="d-f ai-b">
                <div style={{ width: 150 }} className="fs-0 t-small">
                  {!APISecret &&
                    <span className="red-star">
                      {'*'}
                    </span>}
                  {'Mailjet API Secret:'}
                </div>
                <input
                  className="fg-1"
                  value={APISecret}
                  onChange={this.handleChangeInput('APISecret')}
                  placeholder="Mailjet API Secret"
                  type="text"
                />
              </div>

              <div className="d-f ai-b">
                <div style={{ width: 150 }} className="fs-0 t-small">
                  {!SenderEmail &&
                    <span className="red-star">
                      {'*'}
                    </span>}
                  {'Sender Email:'}
                </div>
                <div className="d-f fd-c fg-1">
                  <input
                    value={SenderEmail}
                    onChange={this.handleChangeInput('SenderEmail')}
                    placeholder="Sender Email"
                    type="text"
                  />
                  <div className="t-small mt-10 ta-r d-f ai-c flow-h-5">
                    <IconInfo />
                    <div>
                      {'Must be a verified sender. '}
                    </div>
                    <div
                      className="a white"
                      onClick={() => shell.openExternal('https://app.mailjet.com/account/sender')}
                    >
                      {'Learn more'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    )
  }
}

export default MailjetInfos
