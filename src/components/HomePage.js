import React, { Component } from 'react'

import SideBar from './SideBar'
import Modal from './Modal'

import '../styles/Home.scss'

class HomePage extends Component {
  render () {
    return (
      <div className='HomePage anim-page'>
        <SideBar />
        <div className='HomePage-content'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default HomePage
