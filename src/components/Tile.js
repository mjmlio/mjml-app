import React, { Component } from 'react'

import Thumbnail from './Thumbnail'
import Overlay from './Overlay'
import EditNameModal from './EditNameModal'

import '../styles/Tile.scss'

class Tile extends Component {

  state = {
    isEditingName: false,
    overlay: false,
    overlayCaptured: false,
  }

  /**
   * Show the hover overlay
   *
   * @returns {undefined}
   */
  showOverlay = () => !this.state.showOverlay && this.setState({ overlay: true })

  /**
   * Hides the hover overlay
   *
   * @returns {undefined}
   */
  hideOverlay = () => this.setState({ overlay: false })

  captureOverlay = toggle => this.setState({ overlayCaptured: toggle })

  toggleEditNameModal (isEditingName) {
    this.captureOverlay(isEditingName)
    this.setState({ isEditingName })
  }

  render () {

    const { isEditingName } = this.state

    const {
      canEditName,
      item,
      overlayActions,
    } = this.props

    const shouldShowOverlay = this.state.overlay || this.state.overlayCaptured

    return (
      <div className='template' onMouseOver={this.showOverlay} onMouseLeave={this.hideOverlay}>
        <Overlay
          item={item}
          Actions={overlayActions}
          captureOverlay={this.captureOverlay}
          visible={shouldShowOverlay} />
        <div className='template-wrapper'>
          <Thumbnail item={item} />
        </div>
        <span className='template-info'>
          {canEditName && shouldShowOverlay && (
            <button
              onClick={this.toggleEditNameModal.bind(this, true)}
              className='Button-invisible'
              style={{ marginRight: 5 }}>
              <i className='ion-edit' />
            </button>
          )}
          {item.get('name')}
        </span>
        <EditNameModal
          item={item}
          isOpened={isEditingName}
          onClose={this.toggleEditNameModal.bind(this, false)} />
      </div>
    )
  }
}

export default Tile
