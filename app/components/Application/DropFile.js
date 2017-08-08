import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'
import IconDrop from 'react-icons/md/file-download'

class DropFile extends Component {
  render() {
    const { isVisible, ...props } = this.props

    return (
      <Motion
        style={{
          opacity: spring(isVisible ? 1 : 0, { stiffness: 300 }),
          y: spring(isVisible ? 0 : 40),
          scale: spring(isVisible ? 1 : 1.1),
        }}
      >
        {m =>
          <div
            {...props}
            className="DropFile"
            style={{
              opacity: m.opacity,
              pointerEvents: isVisible ? 'auto' : 'none',
            }}
          >
            <div
              className="DropFile--border"
              style={{
                transform: `scale(${m.scale})`,
              }}
            />
            <div className="d-f fd-c jc-c ai-c" style={{ pointerEvents: 'none' }}>
              <div style={{ transform: `translate3d(0, ${-m.y}px, 0)` }}>
                <IconDrop className="mb-20" size={100} />
              </div>
              <div style={{ transform: `translate3d(0, ${m.y}px, 0)` }}>
                {'Drop here'}
              </div>
            </div>
          </div>}
      </Motion>
    )
  }
}

export default DropFile
