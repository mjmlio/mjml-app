import React, { Component } from 'react'
import { connect } from 'react-redux'
import IconClose from 'react-icons/md/close'
import IconCheck from 'react-icons/md/check-circle'

import { isModalOpened, closeModal } from 'reducers/modals'

import Panel from 'components/Panel'
import Button from 'components/Button'

@connect(state => ({
  notifs: state.notifs,
  isOpened: isModalOpened(state, 'notifs'),
}), {
  closeModal,
})
class NotifsPanel extends Component {

  handleClose = () => this.props.closeModal('notifs')

  render () {

    const {
      isOpened,
      notifs,
    } = this.props

    return (
      <Panel
        isOpened={isOpened}
        onClose={this.handleClose}
        className='p-10 d-f fd-c flow-v-10'
      >
        <div className='d-f jc-fe fs-0'>
          <Button ghost onClick={this.handleClose}>
            <IconClose />
          </Button>
        </div>
        <div className='fg-1 r'>
          <div className='sticky o-y-a d-f fd-c'>
            {!!notifs.size && (
              <div className='fg-1 z'>
                <IconCheck size={100} className='mb-20' />
                {'No new notifications.'}
              </div>
            )}
          </div>
        </div>
      </Panel>
    )
  }

}

export default NotifsPanel
