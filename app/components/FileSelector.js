import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router'

import '../styles/Home.scss'

@connect(
  state => ({
    templates: state.templates.slice(0, 4)
  })
)
class FileSelector extends Component {

  renderTemplate = (template) => {
    return (
      <div className='template' key={template.get('id')}>
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

          <div className='template'>
            <Link to='editor' className='link'>
              <i className='ion-plus-circled template-icon' />
            </Link>
          </div>

          {templates.map(this.renderTemplate)}

        </div>
      </div>
    )
  }
}

export default FileSelector
