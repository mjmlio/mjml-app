import React, { Component } from 'react'
import get from 'lodash/get'
import cx from 'classnames'
import { connect } from 'react-redux'

import { dropFile } from 'actions/projects'

import Alerts from 'components/Alerts'
import NotifsPanel from 'components/Notifs/NotifsPanel'
import NewProjectModal from 'components/NewProjectModal'
import SettingsModal from 'components/SettingsModal'
import ErrorModal from 'components/ErrorModal'
import AboutModal from 'components/AboutModal'

import Placeholder from './Placeholder'
import DropFile from './DropFile'

import './style.scss'

@connect(state => ({
  projects: state.projects,
  settings: state.settings,
}), {
  dropFile,
})
class Application extends Component {

  state = {
    isOver: false,
  }

  componentDidMount () {
    // USEFUL TO DEBUG CURRENT ACTIVE ELEMENT
    // window.addEventListener('keydown', () => {
    //   setTimeout(() => {
    //     console.log(document.activeElement)
    //   }, 100)
    // })
  }

  handleDragLeave = () => {
    this.setState({ isOver: false })
  }

  handleDrop = e => {
    e.preventDefault()
    this.handleDragLeave()
    const fileName = get(e, 'dataTransfer.files[0].path')
    if (!fileName) { return }
    this.props.dropFile(fileName)
  }

  handleDragOver = e => {
    e.preventDefault()
    if (!this.state.isOver) { this.setState({ isOver: true }) }
  }

  render () {

    const {
      projects,
      settings,
      location,
    } = this.props

    const {
      isOver,
    } = this.state

    const { pathname } = location

    return (
      <div
        className='Application'
        onDragOver={this.handleDragOver}
      >

        <DropFile
          onDragOver={this.handleDragOver}
          onDragLeave={this.handleDragLeave}
          onDrop={this.handleDrop}
          isVisible={isOver}
        />

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
