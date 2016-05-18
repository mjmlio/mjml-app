import React, { Component } from 'react'
import pureRender from 'pure-render-decorator'

import 'styles/Iframe.scss'

@pureRender
class Iframe extends Component {

  state = {
    loading: true,
  }

  componentDidMount () {
    this.renderIframe()
    this.loadImages()
  }

  componentDidUpdate () { this.renderIframe() }

  /**
   * Load all images in the iframe and set the state to { loading: false }
   *
   * @return {undefined}
   */
  loadImages () {

    const doc = this._iframe.contentDocument
    const documentElement = doc.documentElement
    const images = documentElement.querySelectorAll('img')

    Promise.all(Array.from(images).map(i => new Promise(resolve => {
      const img = new Image()
      img.onload = resolve
      img.onerror = resolve
      img.src = i.src
    }))).then(() => {
      this.setState({ loading: false })
    })
  }

  /**
   * Refresh the Iframe
   *
   * @returns {undefined}
   */
  renderIframe () {
    const { template } = this.props
    if (!template) { return }
    const html = template.get('html')
    if (html === this._oldHtml) { return }
    const doc = this._iframe.contentDocument
    const documentElement = doc.documentElement
    documentElement.innerHTML = html
    this._oldHtml = html
  }

  render () {
    const { loading } = this.state

    return (
      <div className='Iframe-container'>
        {loading && (
          <div className='Iframe-loader'>
            <i className='ion-aperture rotating' />
          </div>
        )}
        <iframe
          className='Iframe-iframe'
          ref={el => { this._iframe = el }}/>
      </div>
    )
  }

}

export default Iframe
