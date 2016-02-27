import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router'

import '../styles/Home.scss'

import { createNewTemplate, loadTemplate } from '../actions/template'

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
        <Link to='editor' className='link'>
          <img width='150px' src='https://mjml.io/assets/img/index/welcome-email.png' />
        </Link>
      </div>
    )
  }

  render () {
    const { templates } = this.props

    return (
      <div className='file-selector'>
        <div className='templates'>

          <div className='template' onClick={this.createNew}>
            <div className='link'>
              <i className='ion-plus-circled template-icon' />
            </div>
          </div>

          {templates.map(this.renderTemplate)}

        </div>
      </div>
    )
  }
}

export default FileSelector
