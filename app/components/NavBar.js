import React, { Component } from 'react'
import { Link } from 'react-router'

import '../styles/NavBar.scss'

class NavBar extends Component {

  render () {
    return (
      <div className='NavBar'>
        <div className='NavBar-links'>
          <Link to='/'>{'Home'}</Link>
          <Link activeClassName='active' to='editor'>{'Editor'}</Link>
        </div>
        <div className='NavBar-links right'>
          <Link to='/'>{'Docs'}</Link>
        </div>
      </div>
    )
  }

}

export default NavBar
