import React, { Component } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'

import Alerts from 'components/Alerts'
import NotifsPanel from 'components/Notifs/NotifsPanel'
import NewProjectModal from 'components/NewProjectModal'
import SettingsModal from 'components/SettingsModal'
import ErrorModal from 'components/ErrorModal'
import AboutModal from 'components/AboutModal'

import Placeholder from './Placeholder'

import './style.scss'

@connect(state => ({
  projects: state.projects,
  settings: state.settings,
}))
class Application extends Component {

  componentDidMount () {
    // USEFUL TO DEBUG CURRENT ACTIVE ELEMENT
    // window.addEventListener('keydown', () => {
    //   setTimeout(() => {
    //     console.log(document.activeElement)
    //   }, 100)
    // })
  }

  render () {

    const {
      projects,
      settings,
      location,
    } = this.props

    const { pathname } = location

    return (
      <div
        className={cx('Application', {
          'bg-dark': pathname === '/',
          'bg-darker': pathname === '/project',
        })}
      >

        <Placeholder show={!projects} />
        {projects && this.props.children}

        {settings && <SettingsModal />}
        {settings && <NewProjectModal />}

        <NotifsPanel />
        <ErrorModal />
        <AboutModal />
        <Alerts />

      </div>
    )
  }

}

export default Application
