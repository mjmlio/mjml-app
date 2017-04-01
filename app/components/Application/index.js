import React, { Component } from 'react'
import { connect } from 'react-redux'

import Alerts from 'components/Alerts'
import NewProjectModal from 'components/NewProjectModal'
import SettingsModal from 'components/SettingsModal'

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
    } = this.props

    return (
      <div className='Application'>

        <Placeholder show={!projects} />
        {projects && this.props.children}

        {settings && <SettingsModal />}

        <NewProjectModal />
        <Alerts />

      </div>
    )
  }

}

export default Application
