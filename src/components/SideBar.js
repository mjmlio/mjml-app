
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createNewTemplate, open } from '../actions/templates'
import { comingSoon } from '../actions/'

import '../styles/SideBar.scss'

import Button from './Button'

@connect()
class SideBar extends Component {

  createNew = () => {
    this.props.dispatch(createNewTemplate())
  }

  open = () => {
    this.props.dispatch(open())
  }

  comingSoon = () => {
    this.props.dispatch(comingSoon())
  }

  render () {
    return (
      <div className='SideBar'>
        <ul>
          <li>
            <Button className='SideBar-section'>Recent</Button>
          </li>
          <li>
            <Button className='SideBar-section'>Templates</Button>
          </li>
          <li>
            <Button className='SideBar-section' onClick={this.comingSoon}>Components</Button>
          </li>
          <li>
            <Button className='SideBar-section action' onClick={this.createNew}>New</Button>
          </li>
          <li>
            <Button className='SideBar-section action' onClick={this.open}>Open</Button>
          </li>
        </ul>
      </div>
    )
  }
}

export default SideBar
