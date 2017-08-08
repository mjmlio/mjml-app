import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'

import './style.scss'

class AppPlaceholder extends Component {
  render() {
    const { show } = this.props

    return (
      <Motion style={{ opacity: spring(show ? 1 : 0) }}>
        {m =>
          <div
            className="sticky z bg-dark"
            style={{
              opacity: m.opacity,
              pointerEvents: show ? 'auto' : 'none',
            }}
          />}
      </Motion>
    )
  }
}

export default AppPlaceholder
