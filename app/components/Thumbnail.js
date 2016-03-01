import React, { Component } from 'react'

import '../styles/Thumbnail.scss'

class Thumbnail extends Component {

  static getSrc = (template) => `../thumbnails/${template.get('id')}.png?t=${Date.now()}`

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
