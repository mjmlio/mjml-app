import React, { Component } from 'react'
import { connect } from 'react-redux'

import { createNewTemplate, open } from '../actions/templates'
import SideBar from './SideBar'
import TileGrid from './TileGrid'
import Button from './Button'

import '../styles/Home.scss'

@connect()
class HomePage extends Component {

  createNew = () => {
    this.props.dispatch(createNewTemplate())
  }

  open = () => {
    this.props.dispatch(open())
  }

  /*
  render () {
    return (
      <div className='HomePage'>

        <div className='z' style={{ height: 400 }}>

          <Button className='primary' onClick={this.createNew}>
            <i className='ion-android-add-circle' />
            {' Create a new template'}
          </Button>

          <Button className='primary' onClick={this.open}>
            <i className='ion-android-add-circle' />
            {' Open'}
          </Button>

        </div>

        <h2>{'Latest templates'}</h2>
        <FileSelector />
      </div>
    )
  }
  */


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
