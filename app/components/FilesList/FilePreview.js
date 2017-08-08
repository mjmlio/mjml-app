import React, { Component } from 'react'
import cx from 'classnames'
import { Motion, spring } from 'react-motion'
import { connect } from 'react-redux'

import Button from 'components/Button'
import Iframe from 'components/Iframe'

import { updateSettings } from 'actions/settings'

@connect(
  state => ({
    preview: state.preview,
    previewSize: state.settings.get('previewSize'),
  }),
  {
    updateSettings,
  },
)
class FilePreview extends Component {
  render() {
    const { preview, disablePointer, previewSize, onSetSize, iframeBase } = this.props

    return (
      <div className="FilesList--preview">
        {disablePointer && <div className="FilesList--preview-overlay abs" />}
        <Motion
          style={{
            op: spring(preview ? 1 : 0),
          }}
        >
          {m =>
            <div style={{ opacity: m.op }}>
              <div className="FileList--preview-actions-wrapper">
                <div className="FileList--preview-actions">
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
              {preview
                ? preview.type === 'html'
                  ? <Iframe base={iframeBase} value={preview.content} openLinks />
                  : preview.type === 'image' ? <img src={preview.content} /> : null
                : null}
            </div>}
        </Motion>
      </div>
    )
  }
}

export default FilePreview
