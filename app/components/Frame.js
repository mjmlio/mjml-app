
import React, { Component } from 'react'

import '../styles/Frame.scss'

import { Link } from 'react-router'

class Frame extends Component {

  render () {
    return (
      <div className='Frame'>
        <div className='window'>
          <i className='ion-record window-icon close'/>
          <i className='ion-record window-icon minimize'/>
          <i className='ion-record window-icon maximize'/>
        </div>
        <div className='links'>
          <Link to='settings'>
            <i className='ion-gear-a' />
          </Link>
          <Link to='/'>
            <i className='ion-help' />
          </Link>
          <Link to='/'>
            <i className='ion-person' />
          </Link>
        </div>
      </div>
    )
  }
}

export default Frame
