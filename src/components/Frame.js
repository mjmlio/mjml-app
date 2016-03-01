
import React, { Component } from 'react'
import { remote } from 'electron'

import '../styles/Frame.scss'

import { Link } from 'react-router'

class Frame extends Component {

  close = () => 0

  minimize = () => 0

  maximize = () => 0

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
        <div className='Frame-actions'>
          <Link to='settings' className='Frame-item big'>
            <i className='ion-gear-a' />
          </Link>
          <Link to='/documentation' className='Frame-item big'>
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
