import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Button from 'components/Button'
import Modal from './index'

class ConfirmModal extends Component {
  static propTypes = {
    yepCTA: PropTypes.string.isRequired,
    nopCTA: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  }

  static defaultProps = {
    yepCTA: 'Yes',
    nopCTA: 'No',
  }

  render() {
    const {
      yepCTA,
      nopCTA,
      onConfirm,
      onCancel,
      isConfirmDisabled,
      className,
      children,
      ...props
    } = this.props

    return (
      <Modal {...props} className={cx('Modal-confirm', className)} onClose={onCancel}>
        {children}
        <div className="ModalFooter">
          <Button primary onClick={onConfirm} disabled={isConfirmDisabled}>
            {yepCTA}
          </Button>
          <Button transparent onClick={onCancel}>
            {nopCTA}
          </Button>
        </div>
      </Modal>
    )
  }
}

export default ConfirmModal
