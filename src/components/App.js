import React, { Component, PropTypes } from 'react'

import Frame from 'components/Frame'
import Alerter from 'components/Alerter'

class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  render () {

    return (
      <div className='App'>
        <Alerter />
        <Frame />
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
