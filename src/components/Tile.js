import React, { Component } from 'react'
import { connect } from 'react-redux'

import Thumbnail from 'components/Thumbnail'
import Overlay from 'components/Overlay'
import EditNameModal from 'components/EditNameModal'

import { doUpdateTemplate, saveTemplateWithId } from 'actions/templates'

import 'styles/Tile.scss'

@connect()
class Tile extends Component {

  state = {
    isEditingName: false,
    overlay: false,
    overlayCaptured: false,
    input: false,
    mouseOver: false,
  }

  showOverlay = () => !this.state.showOverlay && this.setState({ overlay: true })

  hideOverlay = () => this.setState({ overlay: false })

  toggle = () => {
    this.setState({ input: true })
  }

  captureOverlay = toggle => this.setState({ overlayCaptured: toggle })

  onChange = e => {
    if (e.key === 'Enter') {
      this.validate(e.target.value)
    }
  }

  validate = value => {

    value = value.target ? value.target.value : value

    const { item, dispatch } = this.props

    this.setState({ input: false, mouseOver: false })
    if (value.trim() === '') { return }
    dispatch(doUpdateTemplate({ id: item.get('id'), updater: t => t.set('name', value) }))
    dispatch(saveTemplateWithId(item.get('id')))
  }

  toggleEditNameModal (isEditingName) {
    this.captureOverlay(isEditingName)
    this.setState({ isEditingName })
  }

  render () {

    const { isEditingName, mouseOver } = this.state

    const {
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
        <span className={`template-info${mouseOver ? ' edit' : ''}`}>
          {this.state.input
            ? <input
              ref={input => input && input.focus()}
              className='Tile-input'
              onBlur={this.validate}
              defaultValue={item.get('name')}
              type='text'
              onKeyPress={this.onChange} />
            : <span
              onClick={this.toggle}
              onMouseEnter={() => this.setState({ mouseOver: true })}
              onMouseLeave={() => this.setState({ mouseOver: false })}>{item.get('name')}</span>}
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
