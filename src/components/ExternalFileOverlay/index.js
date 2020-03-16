import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { TiStarburst as IconLoad } from 'react-icons/ti'

import './style.scss'

export default connect(({ externalFileOverlay }) => ({
  isOpened: externalFileOverlay && externalFileOverlay.isOpened === true,
  openPath: externalFileOverlay && externalFileOverlay.openPath,
}))(
  class ExternalFileOverlay extends PureComponent {
    render() {
      const { isOpened, openPath } = this.props
      if (!isOpened) {
        return false
      }
      return (
        <div className="ExternalFileOverlay">
          <div className="mb-10">{'Opening project...'}</div>
          <div className="mb-20 small">{openPath}</div>
          <IconLoad className="rotating" size={80} />
        </div>
      )
    }
  },
)
