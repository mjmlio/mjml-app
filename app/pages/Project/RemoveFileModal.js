import React, { Component } from 'react'
import PropTypes from 'prop-types'
import path from 'path'
import { connect } from 'react-redux'
import IconInfo from 'react-icons/md/info'

import { isModalOpened, getModalProps, closeModal } from 'reducers/modals'

import ConfirmModal from 'components/Modal/ConfirmModal'

@connect(
  state => {
    return {
      isOpened: isModalOpened(state, 'removeFile'),
      modalProps: getModalProps(state, 'removeFile'),
    }
  },
  {
    closeModal,
  },
)
class RemoveFileModal extends Component {
  static propTypes = {
    rootPath: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired,
  }

  handleClose = () => this.props.closeModal('removeFile')

  render() {
    const { isOpened, onRemove, rootPath, modalProps: file } = this.props

    const full = file ? path.join(rootPath, file.name) : ''

    return (
      <ConfirmModal
        isOpened={isOpened}
        yepCTA="Remove file"
        nopCTA="Cancel"
        onCancel={this.handleClose}
        onConfirm={() => {
          onRemove(full)
          window.requestIdleCallback(this.handleClose)
        }}
      >
        <h2 className="mb-20">
          {'Remove file?'}
        </h2>
        <div className="d-f ai-c t-small">
          <IconInfo className="mr-5" size={20} />
          {"This can't be undone."}
        </div>
      </ConfirmModal>
    )
  }
}

export default RemoveFileModal
