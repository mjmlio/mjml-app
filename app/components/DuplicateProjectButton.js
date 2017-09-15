import React, { Component } from 'react'

import Button from 'components/Button'
import Modal from 'components/Modal'

class DuplicateProjectButton extends Component {
  state = {
    isOpened: false,
  }

  openModal = () => this.setState({ isOpened: true })
  closeModal = () => this.setState({ isOpened: false })

  render() {
    const { projectPath, className } = this.props
    const { isOpened, isConfirmDisabled } = this.state
    return (
      <Button primary className={className} onClick={this.openModal}>
        {'Duplicate project'}
        <Modal isOpened={isOpened} onClose={this.closeModal}>
          <div className="ModalFooter">
            <Button primary onClick={this.handleDuplicate} disabled={isConfirmDisabled}>
              {'Duplicate'}
            </Button>
            <Button transparent onClick={this.closeModal}>
              {'Cancel'}
            </Button>
          </div>
        </Modal>
      </Button>
    )
  }
}

export default DuplicateProjectButton
