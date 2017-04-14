import React, { Component } from 'react'
import { connect } from 'react-redux'
import IconAlert from 'react-icons/io/ios-bell'

import { openModal } from 'reducers/modals'

import Button from 'components/Button'

@connect(null, {
  openModal,
})
class NotifBtn extends Component {

  render () {

    const {
      openModal,
    } = this.props

    return (
      <Button ghost onClick={() => openModal('notifs')}>
        <IconAlert />
      </Button>
    )
  }

}

export default NotifBtn
