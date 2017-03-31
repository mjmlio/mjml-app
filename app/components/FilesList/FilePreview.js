import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'
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
      if (!this._iframe) { return }
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
        {disablePointer && (
          <div className='FilesList--preview-overlay abs' />
        )}
        <Motion
          style={{
            op: spring(preview ? 1 : 0),
          }}
        >
          {m => (
            <div style={{ opacity: m.op }}>
              {preview ? (
                preview.type === 'html' ? (
                  <iframe
                    src=''
                    style={{
                      overflow: 'hidden',
                    }}
                    ref={n => this._iframe = n}
                  />
                ) : null
              ) : null}
            </div>
          )}
        </Motion>
      </div>
    )
  }

}

export default FilePreview
