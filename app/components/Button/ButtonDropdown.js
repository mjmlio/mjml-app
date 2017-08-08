import React, { Component } from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import IconDown from 'react-icons/md/keyboard-arrow-down'

import Tabbable from 'components/Tabbable'
import Button from './index'

class ButtonDropdown extends Component {
  static propTypes = {
    actions: PropTypes.array.isRequired,
  }

  state = {
    choice: null,
    isOpened: false,
  }

  componentWillMount() {
    const { actions } = this.props
    this.setState({ choice: actions[0] })
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.isOpened && this.state.isOpened) {
      document.addEventListener('click', this.handleClickOutside)
    }
    if (prevState.isOpened && !this.state.isOpened) {
      document.removeEventListener('click', this.handleClickOutside)
    }
  }

  handleClickOutside = e => {
    if (!this._dropdown) {
      return
    }
    if (!this._dropdown.contains(e.target)) {
      this.setState({ isOpened: false })
    }
  }

  handleToggleDropdown = () => this.setState({ isOpened: !this.state.isOpened })

  handleClickAction = action => {
    this.setState({
      choice: action,
      isOpened: false,
    })
    action.onClick()
  }

  render() {
    const {
      actions, // eslint-disable-line
      className,
      dropdownWidth,
      ...props
    } = this.props

    const { choice, isOpened } = this.state

    return (
      <div className="r d-f">
        <Button {...props} className={cx('r', className)} onClick={() => choice.onClick()}>
          <span className="mr-5">
            {choice.icon}
          </span>
          {choice.label}
        </Button>
        <Button
          className="r"
          transparent={!!props.transparent}
          ghost={!!props.ghost}
          onClick={this.handleToggleDropdown}
        >
          <IconDown />
        </Button>
        {isOpened &&
          <div
            className="ButtonDropdown--dropdown"
            style={{ width: dropdownWidth }}
            ref={n => (this._dropdown = n)}
          >
            {actions.map(action =>
              <Tabbable
                key={action.label}
                className={cx('ButtonDropdown--dropdown-item', {
                  isActive: action === choice,
                })}
                onClick={() => this.handleClickAction(action)}
              >
                <div className="ButtonDropdown--dropdown-item-icon">
                  {action.icon}
                </div>
                <div className="fg-1">
                  <div className="ButtonDropdown--dropdown-item-title c-white">
                    {action.label}
                  </div>
                  <div className="small mt-5">
                    {action.desc}
                  </div>
                </div>
              </Tabbable>,
            )}
          </div>}
      </div>
    )
  }
}

export default ButtonDropdown
