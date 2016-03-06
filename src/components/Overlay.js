import React, { Component } from 'react'

import '../styles/Overlay.scss'

class Overlay extends Component {

  render () {
    const { visible, item, Actions } = this.props

    return (
      <div>
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
