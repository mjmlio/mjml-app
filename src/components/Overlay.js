
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
        <Button className='primary'>
          <i className='ion-pricetag' />
        </Button>

        <Button className='primary open' onClick={this.loadTemplate(template)}>
          <i className='ion-edit' />
        </Button>

        <Button className='danger' onClick={this.deleteTemplate(template)}>
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
