
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

        <div className='SideBar-section active'>
          {'Recent'}
        </div>

        <div className='SideBar-section'>
          {'Templates'}
        </div>

        <div className='SideBar-section'
          onClick={this.comingSoon}>
          {'Components'}
        </div>

        <div className='SideBar-section action'
          onClick={this.createNew}>
          {'New'}
        </div>

        <div className='SideBar-section action'
          onClick={this.open}>
          {'Open'}
        </div>

      </div>
    )
  }
}

export default SideBar
