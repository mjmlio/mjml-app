import React, { Component } from 'react'

import 'styles/Overlay.scss'

class Overlay extends Component {

  render () {
    const { visible, item, Actions, onMouseLeave } = this.props

    return (
      <div onMouseLeave={onMouseLeave}>
        {visible && (
          <div className='overlay'>
            <Actions item={item} captureOverlay={this.props.captureOverlay} />
          </div>
        )}
      </div>
    )
  }
}

export default Overlay
