import React, { Component } from 'react'
import { connect } from 'react-redux'

import Modal from 'components/Modal'

import {
  isModalOpened,
  closeModal,
} from 'reducers/modals'

import './style.scss'

@connect(state => ({
  isOpened: isModalOpened(state, 'newProject'),
}), {
  closeModal,
})
class NewProjectModal extends Component {

  render () {

    const {
      isOpened,
      closeModal,
    } = this.props

    return (
      <Modal
        isOpened={isOpened}
        onClose={() => closeModal('newProject')}
      >
        {'NewProjectModal'}
      </Modal>
    )
  }

}

export default NewProjectModal
