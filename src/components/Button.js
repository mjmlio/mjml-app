import React, { Component } from 'react'
import _ from 'lodash'
import cx from 'classnames'

import '../styles/Button.scss'

class Button extends Component {

  static defaultProps = {
    onClick: () => {},
  }

  render () {
    const {
      className,
      children,
    } = this.props

    const cn = cx('Button', className)
    const props = _.omit(this.props, ['children', 'className'])

    return (
      <button className={cn} {...props}>
        {children}
      </button>
    )
  }

}

export default Button
