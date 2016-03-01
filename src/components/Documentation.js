
import React, { Component } from 'react'

import '../styles/Documentation.scss'

class Documentation extends Component {

  render () {
    return (
      <iframe className='documentation' src='https://mjml.io/documentation/' frameBorder='0' />
    )
  }
}

export default Documentation
