import React, { Component } from 'react'
import cx from 'classnames'

import Mortal from 'react-mortal'

import './style.scss'

const springConfig = {
  stiffness: 300,
  damping: 30,
}

class Panel extends Component {
  render() {
    const { isOpened, onClose, children, className } = this.props

    return (
      <Mortal
        isOpened={isOpened}
        onClose={onClose}
        motionStyle={(spring, isVisible) => ({
          opacity: spring(isVisible ? 1 : 0, springConfig),
          panelOffset: spring(isVisible ? 0 : 100, springConfig),
        })}
      >
        {(motion, isVisible) =>
          <div
            className="Panel"
            style={{
              pointerEvents: isVisible ? 'auto' : 'none',
            }}
          >
            <div
              className="Panel--overlay"
              onClick={onClose}
              style={{
                opacity: motion.opacity,
                pointerEvents: isVisible ? 'auto' : 'none',
              }}
            />
            <div
              className={cx('Panel--body', className)}
              style={{
                transform: `translate3d(${motion.panelOffset}%, 0, 0)`,
              }}
            >
              {children}
            </div>
          </div>}
      </Mortal>
    )
  }
}

export default Panel
