import React, { Component } from 'react'

class Tabbable extends Component {

  handleKeyDown = e => {
    if (e.which === 13 || e.which === 32) {
      this.props.onClick(e)
    }
  }

  render () {
    const {
      children,
      ...props
    } = this.props
    return (
      <div
        tabIndex={0}
        onKeyDown={this.handleKeyDown}
        {...props}
      >
        {children}
      </div>
    )
  }

}

export default Tabbable
