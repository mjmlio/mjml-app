import React, { Component } from 'react'
import { connect } from 'react-redux'

@connect(state => ({
  preview: state.preview,
}))
class FilePreview extends Component {

  componentDidUpdate (prevProps) {
    const { preview } = this.props
    if (prevProps.preview !== preview) {
      if (preview && preview.type === 'html') {
        this.setIframeContent(preview.content)
      }
    }
  }

  componentWillUnmount () {
    this._unmounted = true
  }

  setIframeContent = content => {
    window.requestAnimationFrame(() => {
      const doc = this._iframe.contentDocument
      const documentElement = doc.documentElement
      documentElement.innerHTML = content
    })
  }

  render () {

    const {
      preview,
      disablePointer,
    } = this.props

    return (
      <div className='FilesList--preview'>
        {!preview ? (
          null
        ) : preview.type === 'html' && (
          <iframe
            src=''
            style={{
              overflow: 'hidden',
              pointerEvents: disablePointer ? 'none' : 'auto',
            }}
            ref={n => this._iframe = n}
          />
        )}
      </div>
    )
  }

}

export default FilePreview
