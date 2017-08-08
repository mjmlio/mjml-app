import React, { Component } from 'react'
import cx from 'classnames'
import IconEmpty from 'react-icons/md/email'

import Iframe from 'components/Iframe'

import './style.scss'

class Preview extends Component {
  render() {
    const { html, scaled, iframeBase } = this.props

    return (
      <div className={cx('Preview abs', { scaled })}>
        {html
          ? <Iframe scrolling={false} value={html} base={iframeBase} />
          : <div className="abs z">
              <IconEmpty size={50} />
            </div>}
      </div>
    )
  }
}

export default Preview
