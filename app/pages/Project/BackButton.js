import React, { Component } from 'react'
import FaHome from 'react-icons/md/arrow-back'
import { Motion, spring } from 'react-motion'

import Button from 'components/Button'

const springConfig = { stiffness: 290 }

class BackButton extends Component {

  state = {
    isOver: false,
  }

  handleMouseEnter = () => this.setState({ isOver: true })
  handleMouseLeave = () => this.setState({ isOver: false })

  render () {

    const {
      projectName,
    } = this.props

    const {
      isOver,
    } = this.state

    return (
      <Button
        className='cu-d ellipsis sticky o-n'
        transparent
        link
        to='/'
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <FaHome className='mr-5' />
        <div className='r d-f ai-c' style={{ height: '100%' }}>
          <Motion style={{ y: spring(isOver ? -30 : 0, springConfig) }}>
            {m => (
              <b
                className='ellipsis'
                style={{
                  transform: `translate3d(0, ${m.y}px, 0)`,
                }}
              >
                {projectName}
              </b>
            )}
          </Motion>
          <div className='sticky d-f ai-c'>
            <Motion style={{ y: spring(isOver ? 0 : 30, springConfig) }}>
              {m => (
                <b style={{ transform: `translate3d(0, ${m.y}px, 0)` }}>
                  {'Back'}
                </b>
              )}
            </Motion>
          </div>
        </div>
      </Button>
    )
  }

}

export default BackButton
