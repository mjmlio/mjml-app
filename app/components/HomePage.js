import React, { Component } from 'react'

import FileSelector from './FileSelector'

import '../styles/Home.scss'

class HomePage extends Component {

  render () {
    return (
      <div className='container-home'>
        <header>
          <img width='200px' src='assets/images/logo.png' alt='mjml' />
        </header>
        <FileSelector />
      </div>
    )
  }
}

export default HomePage
