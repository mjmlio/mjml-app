import React, { Component } from 'react'
import Mortal from 'react-mortal'

import './style.scss'

const springConfig = {
  stiffness: 300,
}

class Modal extends Component {

  render () {

    const {
      isOpened,
      onClose,
      children,
      className,
      style,
    } = this.props

    return (
      <Mortal
        isOpened={isOpened}
        onClose={onClose}
        motionStyle={(spring, isVisible) => ({
          opacity: spring(isVisible ? 1 : 0, springConfig),
          modalOffset: spring(isVisible ? 0 : -90, springConfig),
        })}
      >
        {(motion, isVisible) => (
          <div
            className='Modal'
            style={{
              pointerEvents: isVisible ? 'auto' : 'none',
            }}
          >
            <div
              className='Modal--overlay'
              onClick={onClose}
              style={{
                opacity: motion.opacity,
                pointerEvents: isVisible ? 'auto' : 'none',
              }}
            />
            <div
              className={`Modal--body ${className}`}
              style={{
                opacity: motion.opacity,
                transform: `translate3d(0, ${motion.modalOffset}px, 0)`,
                ...(style || {}),
              }}
            >
              {children}
            </div>
          </div>
        )}
      </Mortal>
    )
  }

}

export default Modal
