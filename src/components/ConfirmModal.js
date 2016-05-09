import React, { Component } from 'react'

import Modal from './Modal'
import Button from './Button'

class ConfirmModal extends Component {

  render () {
    const { onConfirm } = this.props

    return (
      <Modal {...this.props}>

        {this.props.children}

        <div className='ModalConfirmFooter'>
          <a className='link' onClick={this.props.onClose} style={{ marginRight: 20 }}>
            {'Nope!!'}
          </a>
          <Button className='primary' onClick={onConfirm}>
            {'Yep, totally'}
          </Button>
        </div>

      </Modal>
    )
  }

}

export default ConfirmModal
