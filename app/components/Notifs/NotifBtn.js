import React, { Component } from 'react'
import IconAlert from 'react-icons/io/ios-bell'

import Button from 'components/Button'

class NotifBtn extends Component {

  render () {
    return (
      <Button ghost>
        <IconAlert />
      </Button>
    )
  }

}

export default NotifBtn
