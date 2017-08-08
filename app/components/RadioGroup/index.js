import React, { Component, Children, cloneElement } from 'react'

class RadioGroup extends Component {
  render() {
    const { value, onChange, children } = this.props

    return (
      <div className="RadioGroup">
        {Children.map(children, child => {
          return cloneElement(child, {
            isActive: value === child.props.value,
            onChange,
          })
        })}
      </div>
    )
  }
}

export default RadioGroup
