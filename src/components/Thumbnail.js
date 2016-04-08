import React, { Component } from 'react'
import crypto from 'crypto'
import { thumbnailsFolder } from '../helpers/file-system'
import path from 'path'

import '../styles/Thumbnail.scss'

class Thumbnail extends Component {

  static getSrc = item => {
    const itemPath = path.join(thumbnailsFolder, `${item.get('id')}.png`)
    return `${itemPath}?t=${crypto.createHash('sha256').update(item.get('mjml')).digest('base64')}`
  }

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
