
import React, { Component } from 'react'

import '../styles/NotificationBar.scss'

class NotificationBar extends Component {

  render () {

    const { onDismiss } = this.props

    return (
			<div className='NotificationBar'>
				<span>A brand new version of MJML App is available! <a href='https://mjmlio.github.io/mjml-app' target='_blank'>Visit the Download page!</a></span>
				<i className='ion-close-circled' onClick={onDismiss} />
			</div>
		)
  }
}

export default NotificationBar
