import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loadTemplate, deleteTemplate } from 'actions/templates'
import Button from 'components/Button'
import ConfirmModal from 'components/ConfirmModal'

@connect()
class TemplateOverlayActions extends Component {

  state = {
    confirmModal: false,
  }

  loadTemplate = () => this.props.dispatch(loadTemplate(this.props.item))
  deleteTemplate = () => this.props.dispatch(deleteTemplate(this.props.item))

  toggleConfirmModal = o => () => {
    this.setState({ confirmModal: o })
    this.props.captureOverlay(o)
  }

  confirmDelete = () => {
    this.deleteTemplate()
    this.toggleConfirmModal(false)()
  }

  render () {
    const { confirmModal } = this.state

    return (
      <div className='Overlay-actions'>
        <Button className='primary big' onClick={this.loadTemplate}>
          <i className='ion-android-open' />
        </Button>

        <Button className='danger' onClick={this.toggleConfirmModal(true)}>
          <i className='ion-trash-b' />
        </Button>

        <ConfirmModal
          isOpened={confirmModal}
          onConfirm={this.confirmDelete}
          onClose={this.toggleConfirmModal(false)}>
          {'Are you sure you want to delete your template?'}
        </ConfirmModal>

      </div>
    )
  }

}

export default TemplateOverlayActions
