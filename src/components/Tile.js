import React, { Component } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'

import Thumbnail from 'components/Thumbnail'
import Overlay from 'components/Overlay'

import { doUpdateTemplate, saveTemplateWithId } from 'actions/templates'

import 'styles/Tile.scss'

@connect()
class Tile extends Component {

  state = {
    overlay: false,
    overlayCaptured: false,
    input: false,
    mouseOver: false,
  }

  componentDidUpdate (prevProps, prevState) {
    if (!prevState.input && this.state.input) {
      this.refs.input.focus()
      this.refs.input.setSelectionRange(0, this.refs.input.value.length)
    }
  }

  showOverlay = () => !this.state.showOverlay && this.setState({ overlay: true })

  hideOverlay = () => this.setState({ overlay: false })

  toggleEdit = () => {
    if (!this.props.canEditName) { return }
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

  render () {
    const { edit, mouseOver } = this.state
    const { item, overlayActions, canEditName } = this.props

    const shouldShowOverlay = this.state.overlay || this.state.overlayCaptured

    return (
      <div className='template' onMouseLeave={this.hideOverlay}>
        <Overlay
          onMouseLeave={this.hideOverlay}
          item={item}
          Actions={overlayActions}
          captureOverlay={this.captureOverlay}
          visible={shouldShowOverlay} />
        <div className='template-wrapper' onMouseOver={this.showOverlay}>
          <Thumbnail item={item} />
        </div>
        <span className={cx('template-info', {
          editable: canEditName,
          hover: mouseOver && canEditName,
          edit: edit && canEditName,
        })}
          onClick={this.toggleEdit}
          onMouseEnter={() => this.setState({ mouseOver: true })}
          onMouseLeave={() => this.setState({ mouseOver: false })}>
          {this.state.input
            ? <input
              ref='input'
              className='Tile-input'
              onBlur={this.validate}
              defaultValue={item.get('name')}
              type='text'
              onKeyPress={this.onChange} />
            : <span>
                {item.get('name')}
              </span>}
        </span>
      </div>
    )
  }
}

export default Tile
