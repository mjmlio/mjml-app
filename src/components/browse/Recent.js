import React, { Component } from 'react'

import TileGrid from '../TileGrid'

class BrowseRecent extends Component {

  render () {
    const limit = 5

    return (
      <div>
        <TileGrid limit={limit} />
      </div>
    )
  }

}

export default BrowseRecent
