import React, { Component } from 'react'
import IconRadioChecked from 'react-icons/md/radio-button-checked'
import IconRadioUnchecked from 'react-icons/md/radio-button-unchecked'

class Radio extends Component {
  handleKeyDown = e => {
    if (e.which === 13 || e.which === 32) {
      this.props.onChange(this.props.value)
    }
  }

  render() {
    const { isActive, value, onChange, children } = this.props

    return (
      <div
        className="d-f ai-fs t-small focus Radio"
        tabIndex={0}
        onKeyDown={isActive ? undefined : this.handleKeyDown}
        onClick={isActive ? undefined : () => onChange(value)}
      >
        <div className="mr-5 d-f ai-c fs-0" style={{ marginTop: 1 }}>
          {isActive ? <IconRadioChecked /> : <IconRadioUnchecked />}
        </div>
        <div className="fg-1">
          {children}
        </div>
      </div>
    )
  }
}

export default Radio
