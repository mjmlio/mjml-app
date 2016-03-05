import React, { Component } from 'react'
import TileGrid from '../TileGrid'

class Templates extends Component {

  render () {
    // TODO: get presets
    const presets = []

    return (
      <div>
        {!!presets.length
          ? <TileGrid items={presets} />
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
