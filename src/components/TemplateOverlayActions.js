import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loadTemplate, deleteTemplate } from '../actions/templates'
import Button from './Button'

@connect()
class TemplateOverlayActions extends Component {

  /**
   * load the selected template
   *
   * @param {Object} template the selected template
   */
  loadTemplate = template => () => {
    this.props.dispatch(loadTemplate(template))
  }

  /**
   * Deletes an unwanted template
   *
   * @param {Object} template the unwanted template
   */
  deleteTemplate = template => () => {
    this.props.dispatch(deleteTemplate(template))
  }

  render () {
    const { item } = this.props

    return (
      <div className='Overlay-actions'>
        <Button className='primary big' onClick={this.loadTemplate(item)}>
          <i className='ion-android-open' />
        </Button>

        <Button className='danger' onClick={this.deleteTemplate(item)}>
          <i className='ion-trash-b' />
        </Button>
      </div>
    )
  }

}

export default TemplateOverlayActions
