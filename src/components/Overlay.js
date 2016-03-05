
import React, { Component } from 'react'

import Button from './Button'

import '../styles/Overlay.scss'

class Overlay extends Component {

  renderOverlay (template) {
  
    return (
      <div className='overlay'>
        <Button className='button'>
          <i className='ion-pricetag' />
        </Button>

        <Button className='button open'>
          <i className='ion-android-open' />
        </Button>

        <Button className='button'>
          <i className='ion-trash-b' />
        </Button>
      </div>
    )
  }

  render () {
    const { visible, template } = this.props

    return (
      <div>
        {visible && this.renderOverlay(template)}
      </div>
    )
  }
}

export default Overlay
