import React, { Component, PropTypes } from 'react'
import cx from 'classnames'

import 'styles/DropDown.scss'

import Button from 'components/Button'

class DropDown extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  state = {
    open: false,
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.close)
  }

  close = () => {
    this.setState({ open: false })
    document.removeEventListener('click', this.close)
  }

  /**
   * toggle the drop menu visibility
   *
   * @returns {undefined}
   */
  toggle = () => {
    this.setState({ open: !this.state.open })
    if (!this.state.open) {
      document.addEventListener('click', this.close, false)
    } else {
      document.removeEventListener('click', this.close)
    }
  }

  render () {
    const {
      className,
      title,
      icon,
      children,
    } = this.props
    const { open } = this.state

    const cn = cx('DropDown', className, { open })

    return (
      <Button className={cn} onClick={this.toggle}>
        {!!icon && <i className={icon} />}

        {title}

        {open && (
          <div className='DropDown-menu'>
            {children}
          </div>
        )}
      </Button>
    )
  }

}

export default DropDown
