import React, { Component } from 'react'

import FileSelector from './FileSelector'

import '../styles/Home.scss'

class HomePage extends Component {

  render () {
    return (
      <div className='container-home'>
        <header>
          <h1>MJML App.</h1>
          <img width='200px' src='https://avatars1.githubusercontent.com/u/16115896?v=3' alt='mjml' />
        </header>
        <FileSelector />
      </div>
    )
  }
}

export default HomePage
