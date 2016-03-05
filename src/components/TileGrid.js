
import React, { Component } from 'react'
import { connect } from 'react-redux'
import ScrollArea from 'react-scrollbar'

import Tile from './Tile'

import '../styles/TileGrid.scss'

@connect(
  state => ({
    templates: state.templates.get('list')
  })
)
class TileGrid extends Component {

  render () {
    const { templates, limit } = this.props

    const tps = limit ? templates.slice(0, limit) : templates

    return (
      <div className='TileGrid'>
        <ScrollArea className='TileGrid-abs anim-sub-page'>
          <div className='TileGrid-wrapper'>
            {tps.map(template => <Tile template={template} key={template.get('id')}/>)}
          </div>
        </ScrollArea>
      </div>
    )
  }
}

export default TileGrid
