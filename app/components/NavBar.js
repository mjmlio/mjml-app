import React, { Component } from 'react'
import { Link } from 'react-router'

import '../styles/NavBar.scss'

class NavBar extends Component {

  render () {
    return (
      <div className='NavBar'>
        <div className='NavBar-links'>
          <Link to='/'>{'Home'}</Link>
        </div>
        <div className='NavBar-links right'>
          <Link to='/'>{'Docs'}</Link>
          <Link to='settings'>{'Settings'}</Link>
        </div>
      </div>
    )
  }

}

export default NavBar
