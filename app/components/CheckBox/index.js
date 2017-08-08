import React, { Component } from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import IconUnchecked from 'react-icons/md/check-box-outline-blank'
import IconChecked from 'react-icons/md/check-box'

import './style.scss'

class CheckBox extends Component {
  static propTypes = {
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  handleKeyDown = e => {
    if (e.which === 13 || e.which === 32) {
      this.props.onChange(!this.props.value)
    }
  }

  render() {
    const { value, onChange, children, className } = this.props

    return (
      <div
        tabIndex={0}
        className={cx(className, 'Checkbox d-f ai-fs cu-d t-small focus')}
        onKeyDown={this.handleKeyDown}
        onClick={() => onChange(!value)}
      >
        <div className="mr-5 z">
          {value ? <IconChecked size={15} /> : <IconUnchecked size={15} />}
        </div>
        <div>
          {children}
        </div>
      </div>
    )
  }
}

export default CheckBox
