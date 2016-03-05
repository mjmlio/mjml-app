
import React, { Component } from 'react'
import Portal from 'react-portal'

import '../styles/Modal.scss'
import Button from './Button'

class Modal extends Component {

  wrap (content) {
    return (
      <Portal ref='portal' isOpened={this.props.isOpened}>
        {content}
      </Portal>
    )
  }

  render () {
    return (
      <div className='container'>
        <div className='modal'>
          <Button className='button'>
            <i className='ion-close-round' />
          </Button>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Modal
