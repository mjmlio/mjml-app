
import React, { Component } from 'react'

import Thumbnail from './Thumbnail'
import Overlay from './Overlay'

import '../styles/Tile.scss'

class Tile extends Component {

  state = {
    overlay: false
  }

  showOverlay = () => !this.state.showOverlay && this.setState({ overlay: true })
  hideOverlay = () => this.setState({ overlay: false })

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
          visible={this.state.overlay} />
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
