import cx from 'classnames'
import React, { Component } from 'react'

import 'styles/Button.scss'

class Button extends Component {

  render () {
    const { children, href, className, onClick } = this.props
    const cl = cx('Button', className)

    return (
      <a href={href} className={cl} onClick={onClick}>
        {children}
      </a>
    )
  }
}

export default Button
