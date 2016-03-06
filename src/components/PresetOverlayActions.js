import React, { Component } from 'react'
import { connect } from 'react-redux'

import { usePreset } from '../actions/templates'
import Button from './Button'

@connect()
class TemplateOverlayActions extends Component {

  usePreset = () => {
    const { item } = this.props

    this.props.dispatch(usePreset(item))
  }

  render () {
    return (
      <div className='Overlay-actions'>
        <Button className='success big' onClick={this.usePreset}>
          <i style={{ fontSize: 25 }} className='ion-ios-copy' />
        </Button>
      </div>
    )
  }

}

export default TemplateOverlayActions
