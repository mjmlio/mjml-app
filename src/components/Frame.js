import React, { Component } from 'react'

import 'styles/Frame.scss'

class Frame extends Component {

  render () {
    return (
      <div className='Frame'>
        <div className='Frame-center'>
          <div className='Frame-item'>
            {'mjml'}
          </div>
        </div>
        <div className='Frame-actions'>
        </div>
      </div>
    )
  }
}

export default Frame
