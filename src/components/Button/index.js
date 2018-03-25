import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { Link } from 'react-router'
import cx from 'classnames'

import './style.scss'

class Button extends Component {
  focus = () => {
    const n = findDOMNode(this._wrapped) // eslint-disable-line react/no-find-dom-node
    n.focus()
  }

  render() {
    const {
      link,
      primary,
      ghost,
      warn,
      transparent,
      unclickable,
      className,
      children,
      disabled,
      small,
      ...props
    } = this.props

    const cn = cx('Button', className, {
      primary,
      ghost,
      warn,
      unclickable,
      transparent,
      small,
    })

    const p = {
      className: cn,
      disabled,
      tabIndex: unclickable ? undefined : 0,
      ...props,
      ref: n => (this._wrapped = n),
    }

    const el = link ? Link : unclickable ? 'div' : 'button'

    return React.createElement(el, p, children)
  }
}

export default Button
