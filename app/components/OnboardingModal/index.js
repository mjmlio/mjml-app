import React, { Component } from 'react'
import noop from 'lodash/noop'
import { connect } from 'react-redux'

import { addProject } from 'actions/folders'

import Button from 'components/Button'
import Modal from 'components/Modal'

@connect(state => ({
  isOpened: state.settings.get('folders').size === 0,
}), {
  addProject,
})
class OnboardingModal extends Component {

  render () {

    const {
      addProject,
      isOpened,
    } = this.props

    return (
      <Modal
        isOpened={isOpened}
        onClose={noop}
      >

        <Button primary onClick={() => addProject()}>
          {'import folder'}
        </Button>

      </Modal>
    )
  }
}

export default OnboardingModal
