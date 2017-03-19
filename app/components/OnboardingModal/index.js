import React, { Component } from 'react'
import noop from 'lodash/noop'
import { connect } from 'react-redux'

import { addFolder } from 'actions/folders'

import Button from 'components/Button'
import Modal from 'components/Modal'

@connect(state => ({
  isOpened: state.settings.get('folders').size === 0,
}), {
  addFolder,
})
class OnboardingModal extends Component {

  render () {

    const {
      addFolder,
      isOpened,
    } = this.props

    return (
      <Modal
        isOpened={isOpened}
        onClose={noop}
      >

        <Button primary onClick={() => addFolder()}>
          {'import folder'}
        </Button>

      </Modal>
    )
  }
}

export default OnboardingModal
