import React, { Component } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'

import { dropFile } from 'actions/projects'

import Alerts from 'components/Alerts'
import NewProjectModal from 'components/NewProjectModal'
import SettingsModal from 'components/SettingsModal'
import ErrorModal from 'components/ErrorModal'
import AboutModal from 'components/AboutModal'
import ExternalFileOverlay from 'components/ExternalFileOverlay'

import Placeholder from './Placeholder'
import DropFile from './DropFile'

import './style.scss'

@connect(
  state => ({
    projects: state.projects,
    settings: state.settings,
  }),
  {
    dropFile,
  },
)
class Application extends Component {
  state = {
    isOver: false,
  }

  componentDidMount() {
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
    if (!e.dataTransfer.files || !e.dataTransfer.files.length) {
      return
    }
    const fileName = e.dataTransfer.files[0].path
    this.props.dropFile(fileName)
  }

  handleDragOver = e => {
    e.preventDefault()
    if (!this.state.isOver) {
      this.setState({ isOver: true })
    }
  }

  render() {
    const { projects, settings, location } = this.props

    const { isOver } = this.state

    const { pathname } = location

    return (
      <div
        className={cx('Application', {
          'bg-dark': pathname === '/',
          'bg-darker': pathname === '/project',
          isOver,
        })}
        onDragOver={this.handleDragOver}
      >
        <DropFile
          onDragOver={this.handleDragOver}
          onDragLeave={this.handleDragLeave}
          onDrop={this.handleDrop}
          isVisible={isOver}
        />

        <ExternalFileOverlay />

        <Placeholder show={!projects} />
        {projects && this.props.children}

        {settings && <SettingsModal />}
        {settings && <NewProjectModal />}

        <ErrorModal />
        <AboutModal />
        <Alerts />
      </div>
    )
  }
}

export default Application
