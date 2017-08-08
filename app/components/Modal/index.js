import React, { Component } from 'react'
import cx from 'classnames'
import Mortal from 'react-mortal'

import './style.scss'

const springConfig = {
  stiffness: 300,
}

class Modal extends Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.isOpened && this.props.isOpened) {
      this._node.focus()
    }
  }

  render() {
    const { isOpened, onClose, children, className, style, noUI } = this.props

    return (
      <Mortal
        isOpened={isOpened}
        onClose={onClose}
        motionStyle={(spring, isVisible) => ({
          opacity: spring(isVisible ? 1 : 0, springConfig),
          modalOffset: spring(isVisible ? 0 : -20, springConfig),
        })}
      >
        {(motion, isVisible) =>
          <div
            className={cx('Modal', {
              withUI: !noUI,
            })}
            style={{
              pointerEvents: isVisible ? 'auto' : 'none',
            }}
          >
            <div
              className="Modal--overlay"
              onClick={onClose}
              style={{
                opacity: motion.opacity,
                pointerEvents: isVisible ? 'auto' : 'none',
              }}
            />
            <div className="Modal-box">
              <div
                tabIndex={0}
                ref={n => (this._node = n)}
                className={cx('Modal--body', className)}
                style={{
                  opacity: motion.opacity,
                  transform: `translate3d(0, ${motion.modalOffset}px, 0)`,
                  ...(style || {}),
                }}
              >
                {children}
              </div>
            </div>
          </div>}
      </Mortal>
    )
  }
}

export default Modal
