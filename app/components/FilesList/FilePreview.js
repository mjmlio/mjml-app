import React, { Component } from 'react'
import cx from 'classnames'
import { Motion, spring } from 'react-motion'
import { connect } from 'react-redux'

import Button from 'components/Button'

import { updateSettings } from 'actions/settings'

@connect(state => ({
  preview: state.preview,
  previewSize: state.settings.get('previewSize'),
}), {
  updateSettings,
})
class FilePreview extends Component {

  componentDidMount () {
    const { preview } = this.props
    if (preview && preview.type === 'html') {
      this.setIframeContent(preview.content)
    }
  }

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
      previewSize,
      onSetSize,
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
              <div className='FileList--preview-actions-wrapper'>
                <div className='FileList--preview-actions'>
                  <Button
                    ghost
                    className={cx({
                      isActive: previewSize.get('current') === previewSize.get('desktop'),
                    })}
                    onClick={() => onSetSize(previewSize.get('desktop'))}
                  >
                    {'Desktop'}
                  </Button>
                  <Button
                    ghost
                    className={cx({
                      isActive: previewSize.get('current') === previewSize.get('mobile'),
                    })}
                    onClick={() => onSetSize(previewSize.get('mobile'))}
                  >
                    {'Mobile'}
                  </Button>
                </div>
              </div>
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
