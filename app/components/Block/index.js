import React, { Component } from 'react'
import cx from 'classnames'

import './style.scss'

class Block extends Component {

  render () {

    const {
      children,
      className,
      ...props
    } = this.props

    const cn = cx('Block', className, {
    })

    return (
      <div className={cn} {...props}>
        {children}
      </div>
    )
  }

}

export default Block
