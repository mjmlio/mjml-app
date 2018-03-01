import React, { Component } from 'react'

class Tabbable extends Component {
  handleKeyDown = e => {
    if (this.props.disabled) {
      return
    }
    if (e.which === 13 || e.which === 32) {
      this.props.onClick(e)
    }
  }

  render() {
    const { children, disabled, ...props } = this.props

    return (
      <div tabIndex={disabled ? -1 : 0} onKeyDown={this.handleKeyDown} {...props}>
        {children}
      </div>
    )
  }
}

export default Tabbable
