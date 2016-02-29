import React, { Component } from 'react'
import { connect } from 'react-redux'

import SideBar from './SideBar'
import TileGrid from './TileGrid'

import '../styles/Home.scss'

class HomePage extends Component {
  render () {
    return (
      <div className='HomePage'>
        <SideBar />
        <TileGrid />
      </div>
    )
  }
}

export default HomePage
