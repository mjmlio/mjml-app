import { connect } from 'react-redux'
import React, { Component } from 'react'

import '../styles/Home.scss'

import { createNewTemplate, loadTemplate, deleteTemplate } from '../actions/templates'
import Thumbnail from './Thumbnail'

@connect(
  state => ({
    templates: state.templates.get('list'),
  })
)
class FileSelector extends Component {

  /**
   * Create a new empty template
   *
   */
  createNew = () => {
    this.props.dispatch(createNewTemplate())
  }

  /**
   * Delete a given template
   *
   * @param {Object} template the unwanted template
   * @returns {undefined}
   */
  deleteTemplate = (template, e) => {
    e.stopPropagation()
    this.props.dispatch(deleteTemplate(template))
  }

  /**
   * Load a template to the editor
   *
   * @param {Object} template the template to be loaded
   * @returns {undefined}
   */
  loadTemplate = template => {
    this.props.dispatch(loadTemplate(template))
  }

  /**
   * Render a single template tile
   *
   * @param {Object} tempalte the template to be loaded
   * @returns {Object} React element
   */
  renderTemplate = (template) => {
    return (
      <div className='template' key={template.get('id')} onClick={this.loadTemplate.bind(this, template)}>
        <div className='template-delete' onClick={this.deleteTemplate.bind(this, template)}>
          <i className='ion-close-circled' />
        </div>
        <div className='template-wrapper'>
          <Thumbnail template={template} />
        </div>
      </div>
    )
  }

  render () {
    const { templates } = this.props

    return (
      <div className='file-selector'>
        <div className='templates'>
          {templates.map(this.renderTemplate)}
        </div>
      </div>
    )
  }
}

export default FileSelector
