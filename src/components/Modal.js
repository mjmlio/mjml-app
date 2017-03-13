import React, { Component } from 'react'
import Portal from 'react-portal'

import 'styles/Modal.scss'

class Modal extends Component {

  preventdefault = e => {
    e.preventDefault()
    e.stopPropagation()
  }

  render () {
    const {
      isOpened,
      onClose,
      children,
    } = this.props

    return (
      <Portal
        onClose={onClose}
        closeOnEsc
        isOpened={isOpened}
        className='Modal-container'
      >
        <div className='Modal-container' onClick={onClose}>
          <div className='Modal' onClick={this.preventdefault}>
            <i onClick={onClose} className='ion-close' />
            <div>
              {children}
            </div>
          </div>
        </div>
      </Portal>
    )
  }
}

export default Modal
