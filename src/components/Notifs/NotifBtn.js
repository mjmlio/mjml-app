import React, { Component } from 'react'
import { connect } from 'react-redux'
import IconAlert from 'react-icons/io/ios-bell'

import { openModal } from 'reducers/modals'

import Button from 'components/Button'

import './style.scss'

@connect(
  state => ({
    notifs: state.notifs,
  }),
  {
    openModal,
  },
)
class NotifBtn extends Component {
  render() {
    const { openModal, notifs } = this.props

    return (
      <Button ghost onClick={() => openModal('notifs')} className="r o-v">
        <IconAlert />
        {!!notifs.size && <div className="NotifBubble" />}
      </Button>
    )
  }
}

export default NotifBtn
