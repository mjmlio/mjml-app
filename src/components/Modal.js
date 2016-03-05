import React, { Component } from 'react'
import Portal from 'react-portal'

import '../styles/Modal.scss'

class Modal extends Component {

  render () {
    const {
      isOpened,
      onClose,
      children
    } = this.props

    return (
      <Portal
        onClose={onClose}
        closeOnOutsideClick
        closeOnEsc
        isOpened={isOpened}
        className='Modal-container'>

        <div className='Modal'>
          {children}
        </div>

      </Portal>
    )
  }
}

export default Modal
