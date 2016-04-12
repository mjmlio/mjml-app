import React, { Component } from 'react'
import { connect } from 'react-redux'
import { dismissVersion } from '../actions'
import { fetchLastVersion } from '../actions'

import NotificationBar from './NotificationBar'
import SideBar from './SideBar'

import '../styles/Home.scss'

@connect(
  state => ({
    version: state.config.get('version'),
    lastVersion: state.config.get('lastVersion'),
    hiddenVersion: state.config.get('hiddenVersion'),
  })
)
class HomePage extends Component {

  componentDidMount () {
    this.props.dispatch(fetchLastVersion())
  }

  dismiss = () => {
    this.props.dispatch(dismissVersion())
  }

  render () {

    const { version, lastVersion, hiddenVersion } = this.props

    return (
      <div className='HomePage anim-page'>

        {(version !== lastVersion)
          && (hiddenVersion !== lastVersion)
          && <NotificationBar onDismiss={this.dismiss} />}

        <SideBar />
        <div className='HomePage-content'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default HomePage
