
import React, { Component } from 'react'
import ScrollArea from 'react-scrollbar'

import Tile from './Tile'

import '../styles/TileGrid.scss'

class TileGrid extends Component {

  render () {
    const { items } = this.props

    return (
      <div className='TileGrid'>
        <ScrollArea className='TileGrid-abs anim-sub-page'>
          <div className='TileGrid-wrapper'>
            {items.map(item =>
              <Tile template={item} key={item.get('id')}/>)}
          </div>
        </ScrollArea>
      </div>
    )
  }
}

export default TileGrid
