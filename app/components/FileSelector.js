import { connect } from 'react-redux'
import React, { Component } from 'react'

import '../styles/Home.scss'

import { createNewTemplate, loadTemplate } from '../actions/template'
import Thumbnail from './Thumbnail'

@connect(
  state => ({
    templates: state.templates.slice(0, 4)
  })
)
class FileSelector extends Component {

  createNew = () => {
    this.props.dispatch(createNewTemplate())
  }

  loadTemplate = template => {
    this.props.dispatch(loadTemplate(template))
  }

  renderTemplate = (template) => {
    return (
      <div className='template' key={template.get('id')} onClick={this.loadTemplate.bind(this, template)}>
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
