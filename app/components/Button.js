import React, { Component } from 'react'
import cx from 'classnames'

import '../styles/Button.scss'

class Button extends Component {

  static defaultProps = {
    onClick: () => {}
  }

  render () {
    const {
      className,
      children,
      onClick
    } = this.props

    const cn = cx('Button', className)
    return (
      <div className={cn} onClick={onClick}>
        {children}
      </div>
    )
  }

}

export default Button
