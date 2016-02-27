import React, { Component, PropTypes } from 'react'

import NavBar from './NavBar'

class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired
  }

  render () {
    return (
      <div className='App'>
        <NavBar />
        <div className='App-content'>
          {this.props.children}
        </div>
        {
          (() => {
            if (process.env.NODE_ENV !== 'production') {
              const DevTools = require('./DevTools')
              return <DevTools />
            }
          })()
        }
      </div>
    )
  }
}

export default App
