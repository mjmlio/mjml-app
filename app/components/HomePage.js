import React, { Component } from 'react'
import { connect } from 'react-redux'

import FileSelector from './FileSelector'
import { readTemplates } from '../actions/templates'

import '../styles/Home.scss'

@connect()
class HomePage extends Component {

  componentWillMount () {
    this.props.dispatch(readTemplates())
  }

  render () {
    return (
      <div className='HomePage'>
        <h2>{'Latest templates'}</h2>
        <FileSelector />
      </div>
    )
  }
}

export default HomePage
