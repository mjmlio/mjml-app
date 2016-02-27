import React, { Component } from 'react'

import '../styles/Home.scss'

class Home extends Component {

  render () {
    return (
      <div className='container-home'>
        <header>
          <h1>MJML App.</h1>
          <img width="200px" src="https://avatars1.githubusercontent.com/u/16115896?v=3" alt="mjml" />
        </header>
      </div>
    )
  }
}

export default Home
