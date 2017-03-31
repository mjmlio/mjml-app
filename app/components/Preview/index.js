import React, { Component } from 'react'
import cx from 'classnames'
import IconEmpty from 'react-icons/md/email'

import './style.scss'

class Preview extends Component {

  componentDidMount () {
    if (this._iframe && this.props.html) {
      this.setIframeContent(this.props.html)
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.html !== this.props.html && this.props.html && this._iframe) {
      this.setIframeContent(this.props.html)
    }
  }

  setIframeContent = html => {
    window.requestAnimationFrame(() => {
      if (!this._iframe) { return }
      const doc = this._iframe.contentDocument
      const documentElement = doc.documentElement
      documentElement.innerHTML = html
    })
  }

  render () {

    const {
      html,
      scaled,
    } = this.props

    return (
      <div className={cx('Preview abs', { scaled })}>
        {html ? (
          <iframe tabIndex={-1} scrolling='no' ref={n => this._iframe = n} />
        ) : (
          <div className='abs z'>
            <IconEmpty size={50} />
          </div>
        )}
      </div>
    )
  }

}

export default Preview
