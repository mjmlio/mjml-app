
import React, { Component } from 'react'
import { connect } from 'react-redux'

import Thumbnail from './Thumbnail'
import Overlay from './Overlay'
import { loadTemplate } from '../actions/templates'

import '../styles/Tile.scss'

@connect()
class Tile extends Component {

  loadTemplate = template => {
    this.props.dispatch(loadTemplate(template))
  }

  toggleOverlay = () => {
    this._hover = !this._hover
  }

  render () {

    const { template } = this.props

      // <div className='template' onClick={this.loadTemplate.bind(this, template)}>
    return (
      <div className='template' onMouseEnter={this.toggleOverlay} onMouseLeave={this.toggleOverlay}>
        <Overlay template={template} visible={this._hover}/>
        <div className='template-wrapper'>
          <Thumbnail template={template} />
        </div>
        <span className='template-info'>Untitled</span>
      </div>
    )
  }
}

export default Tile
