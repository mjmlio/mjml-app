import React, { Component } from 'react'
import crypto from 'crypto'

import '../styles/Thumbnail.scss'

class Thumbnail extends Component {

  static getSrc = template => `../thumbnails/${template.get('id')}.png?t=${crypto.createHash('sha256').update(template.get('mjml')).digest('base64')}`

  render () {
    const { template } = this.props
    const thumbnailLoading = template.get('thumbnailLoading')

    return (
      <div className='Thumbnail'>
        {thumbnailLoading && <span className='Loading ion-android-sync'></span>}
        {!thumbnailLoading && <div className='Preview' style={{ backgroundImage: `url(${Thumbnail.getSrc(template)})` }}></div>}
      </div>
    )
  }

}

export default Thumbnail
