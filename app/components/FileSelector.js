
import React, { Component } from 'react'
import { Link } from 'react-router'

import '../styles/Home.scss'

// TMP
const templates = []

class FileSelector extends Component {

  renderTemplates () {
    return (
      <div className='templates'>
        <div className='template'>
          <Link to='editor' className='link'>
            <i className='ion-plus-circled template-icon' />
          </Link>
        </div>

        <div className='template'>
          <Link to='editor' className='link'>
            <img width="150px" src='https://mjml.io/assets/img/index/welcome-email.png' />
          </Link>
        </div>

        <div className='template'>
          <Link to='editor' className='link'>
            <img width="150px" src='https://mjml.io/assets/img/index/receipt-email.png' />
          </Link>
        </div>

        <div className='template'>
          <Link to='editor' className='link'>
            <img width="150px" src='https://mjml.io/assets/img/index/racoon.png' />
          </Link>
        </div>

        <div className='template'>
          <Link to='editor' className='link'>
            <img width="150px" src='https://mjml.io/assets/img/index/amario.png' />
          </Link>
        </div>

        <div className='template'>
          <Link to='editor' className='link'>
            <i className='ion-ios-browsers-outline template-icon' />
          </Link>
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className='file-selector'>
        {this.renderTemplates()}
      </div>
    )
  }
}

export default FileSelector
