import React, { Component } from 'react'
import { connect } from 'react-redux'

import FileSelector from './FileSelector'
import { readTemplates } from '../actions/templates'
import { createNewTemplate } from '../actions/template'
import Button from './Button'

import '../styles/Home.scss'

@connect()
class HomePage extends Component {

  componentWillMount () {
    this.props.dispatch(readTemplates())
  }

  createNew = () => {
    this.props.dispatch(createNewTemplate())
  }

  render () {
    return (
      <div className='HomePage'>

        <div className='z' style={{ height: 400 }}>

          <Button className='primary' onClick={this.createNew}>
            <i className='ion-android-add-circle' />
            {' Create a new template'}
          </Button>

        </div>

        <h2>{'Latest templates'}</h2>
        <FileSelector />
      </div>
    )
  }
}

export default HomePage
