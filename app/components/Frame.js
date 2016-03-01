
import React, { Component } from 'react'

import '../styles/Frame.scss'

import { Link } from 'react-router'

class Frame extends Component {

  render () {
    return (
      <div className='Frame'>
        <div className='Frame-center'>
          <div className='Frame-item'>
            <Link to='/' className='HomeLink'>
              <img
                width='20'
                height='40'
                src='assets/images/logo_white.svg'
                alt='mjml' />
              {'mjml'}
            </Link>
          </div>
        </div>
        <div className='Frame-window'>
          <div className='Frame-item'>
            <i className='ion-record window-icon close'/>
          </div>
          <div className='Frame-item'>
            <i className='ion-record window-icon minimize'/>
          </div>
          <div className='Frame-item'>
            <i className='ion-record window-icon maximize'/>
          </div>
        </div>
        <div className='Frame-actions'>
          <Link to='settings' className='Frame-item big'>
            <i className='ion-gear-a' />
          </Link>
          <Link to='/' className='Frame-item big'>
            <i className='ion-help' />
          </Link>
          <Link to='/' className='Frame-item big'>
            <i className='ion-person' />
          </Link>
        </div>
      </div>
    )
  }
}

export default Frame
