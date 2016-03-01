
import React, { Component } from 'react'

import '../styles/Documentation.scss'

class Documentation extends Component {

  render () {
    return (
      <iframe className='documentation' src="https://mjml.io/documentation/" frameborder="0"></iframe>
    )
  }
}

export default Documentation
