import React, { Component } from 'react'
import crypto from 'crypto'

import '../styles/Thumbnail.scss'

class Thumbnail extends Component {

  static getSrc = item => `../thumbnails/${item.get('id')}.png?t=${crypto.createHash('sha256').update(item.get('mjml')).digest('base64')}`

  render () {
    const { item } = this.props
    const thumbnailLoading = item.get('thumbnailLoading')

    return (
      <div className='Thumbnail'>
        {thumbnailLoading && <span className='Loading ion-android-sync'></span>}
        {!thumbnailLoading && <div className='Preview' style={{ backgroundImage: `url(${Thumbnail.getSrc(item)})` }}></div>}
      </div>
    )
  }

}

export default Thumbnail
