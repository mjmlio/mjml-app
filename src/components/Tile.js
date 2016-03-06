
import React, { Component } from 'react'

import Thumbnail from './Thumbnail'
import Overlay from './Overlay'

import '../styles/Tile.scss'

class Tile extends Component {

  state = {
    overlay: false,
    overlayCaptured: false
  }

  showOverlay = () => !this.state.showOverlay && this.setState({ overlay: true })
  hideOverlay = () => this.setState({ overlay: false })

  captureOverlay = toggle => this.setState({ overlayCaptured: toggle })

  render () {
    const {
      item,
      overlayActions
    } = this.props

    return (
      <div className='template' onMouseOver={this.showOverlay} onMouseLeave={this.hideOverlay}>
        <Overlay
          item={item}
          Actions={overlayActions}
          captureOverlay={this.captureOverlay}
          visible={this.state.overlay || this.state.overlayCaptured} />
        <div className='template-wrapper'>
          <Thumbnail item={item} />
        </div>
        <span className='template-info'>
          {item.get('name')}
        </span>
      </div>
    )
  }
}

export default Tile
