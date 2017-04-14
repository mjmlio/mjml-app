import React, { Component } from 'react'
import { connect } from 'react-redux'

import { isModalOpened, closeModal } from 'reducers/modals'

import Panel from 'components/Panel'

@connect(state => ({
  isOpened: isModalOpened(state, 'notifs'),
}), {
  closeModal,
})
class NotifsPanel extends Component {

  handleClose = () => this.props.closeModal('notifs')

  render () {

    const {
      isOpened,
    } = this.props

    return (
      <Panel
        isOpened={isOpened}
        onClose={this.handleClose}
      >
        {'NotifsPanel'}
      </Panel>
    )
  }

}

export default NotifsPanel
