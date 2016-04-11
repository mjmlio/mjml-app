import React, { Component } from 'react'
import { connect } from 'react-redux'
import TileGrid from '../TileGrid'

import PresetOverlayActions from '../PresetOverlayActions'

@connect(
  state => ({
    presets: state.presets,
  })
)
class Templates extends Component {

  render () {
    const { presets } = this.props

    return (
      <div>
        {!!presets.size
          ? <TileGrid
            overlayActions={PresetOverlayActions}
            items={presets} />
          : (
            <div className='BlankPlaceholder anim-bounce'>
              <h1 className='anim-fadeInUp'>
                {'No presets availables!'}
              </h1>
            </div>
          )}
      </div>
    )
  }

}

export default Templates
