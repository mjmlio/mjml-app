import React, { Component } from 'react'

import '../styles/Thumbnail.scss'

class Thumbnail extends Component {

  componentDidMount () { this.renderIframe() }
  componentDidUpdate () { this.renderIframe() }

  renderIframe () {
    const { template } = this.props
    const html = template.get('html')
    const doc = this._iframe.contentDocument
    const documentElement = doc.documentElement
    documentElement.innerHTML = html
  }

  render () {
    return (
      <div className='Thumbnail'>
        <iframe
          ref={(el) => this._iframe = el} />
      </div>
    )
  }

}

export default Thumbnail
