
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loadTemplate, deleteTemplate } from '../actions/templates'

import Button from './Button'

import '../styles/Overlay.scss'

@connect()
class Overlay extends Component {

  loadTemplate = template => () => {
    this.props.dispatch(loadTemplate(template))
  }

  deleteTemplate = template => () => {
    this.props.dispatch(deleteTemplate(template))
  }

  renderOverlay (template) {

    return (
      <div className='overlay'>
        <Button className='button'>
          <i className='ion-pricetag' />
        </Button>

        <Button className='button open' onClick={this.loadTemplate(template)}>
          <i className='ion-android-open' />
        </Button>

        <Button className='button' onClick={this.deleteTemplate(template)}>
          <i className='ion-trash-b' />
        </Button>
      </div>
    )
  }

  render () {
    const { visible, template } = this.props

    return (
      <div>
        {visible && this.renderOverlay(template)}
      </div>
    )
  }
}

export default Overlay
