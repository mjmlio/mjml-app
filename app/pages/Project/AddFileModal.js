import React, { Component } from 'react'
import PropTypes from 'prop-types'
import path from 'path'
import debounce from 'lodash/debounce'
import { connect } from 'react-redux'
import IconCheck from 'react-icons/md/check-circle'
import IconChecking from 'react-icons/md/autorenew'
import IconError from 'react-icons/md/error'

import { isModalOpened, closeModal } from 'reducers/modals'
import { fileExists } from 'helpers/fs'

import Modal from 'components/Modal'
import Button from 'components/Button'

@connect(
  state => {
    return {
      isOpened: isModalOpened(state, 'addFile'),
    }
  },
  {
    closeModal,
  },
)
class AddFileModal extends Component {
  static propTypes = {
    rootPath: PropTypes.string.isRequired,
    onAdd: PropTypes.func.isRequired,
  }

  state = {
    fileName: '',
    // unset / checking / valid / invalid
    fileStatus: 'unset',
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isOpened && !nextProps.isOpened) {
      window.requestIdleCallback(() => this.setState({ fileName: '', fileStatus: 'unset' }))
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isOpened && this.props.isOpened) {
      this._inputFileName.focus()
    }
  }

  handleClose = () => this.props.closeModal('addFile')

  handleChangeName = e => {
    const { value } = e.target
    this.setState({
      fileName: value,
      fileStatus: value ? 'checking' : 'unset',
    })
    if (value) {
      this.debounceCheckName()
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    e.stopPropagation()
    const { fileStatus, fileName } = this.state
    if (fileStatus !== 'valid') {
      return
    }
    const { rootPath, onAdd } = this.props
    const full = path.join(rootPath, `${fileName}.mjml`)
    onAdd(full)
    window.requestIdleCallback(this.handleClose)
  }

  debounceCheckName = debounce(async () => {
    const { fileName } = this.state
    if (!fileName) {
      return this.setState({ fileStatus: 'unset' })
    }
    const { rootPath } = this.props
    const full = path.join(rootPath, `${fileName}.mjml`)
    const exists = await fileExists(full)
    this.setState({
      fileStatus: exists ? 'invalid' : 'valid',
    })
  }, 250)

  render() {
    const { isOpened } = this.props

    const { fileName, fileStatus } = this.state

    const isValid = fileStatus === 'valid'
    const nameWithExt = `${fileName}.mjml`

    return (
      <Modal isOpened={isOpened} onClose={this.handleClose}>
        <div className="Modal--label">
          {'Create MJML file'}
        </div>

        <form className="flow-v-20" onSubmit={this.handleSubmit}>
          <div className="d-f ai-b">
            <div style={{ width: 150 }} className="fs-0">
              {'File name:'}
            </div>
            <div className="fg-1">
              <div className="d-f ai-c">
                <input
                  ref={n => (this._inputFileName = n)}
                  className="fg-1"
                  value={fileName}
                  onChange={this.handleChangeName}
                  placeholder="Name"
                  type="text"
                  autoFocus
                />
                <div className="ml-5">
                  {'.mjml'}
                </div>
              </div>
              {fileStatus === 'checking' &&
                <div className="t-small mt-10">
                  <IconChecking className="rotating mr-5" />
                  {'Checking...'}
                </div>}
              {fileStatus === 'valid' &&
                <div className="t-small mt-10">
                  <IconCheck className="mr-5 mb-5" />
                  {'Ready to create'}
                  <b className="ml-5 wb-ba">
                    {nameWithExt}
                  </b>
                </div>}
              {fileStatus === 'invalid' &&
                <div className="t-small mt-10 c-red">
                  <IconError className="mr-5 mb-5" />
                  <b className="mr-5">
                    {nameWithExt}
                  </b>
                  {'already exists'}
                </div>}
            </div>
          </div>
        </form>

        <div className="ModalFooter">
          <Button primary onClick={this.handleSubmit} disabled={!isValid}>
            {'Create file'}
          </Button>
          <Button transparent onClick={this.handleClose}>
            {'Cancel'}
          </Button>
        </div>
      </Modal>
    )
  }
}

export default AddFileModal
