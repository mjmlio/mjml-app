import React, { Component } from 'react'
import { connect } from 'react-redux'

import Alerts from 'components/Alerts'
import NewProjectModal from 'components/NewProjectModal'

import Placeholder from './Placeholder'

import './style.scss'

@connect(state => ({
  projects: state.projects,
}))
class Application extends Component {

  render () {

    const {
      projects,
    } = this.props

    return (
      <div className='Application'>

        <Placeholder show={!projects} />
        {projects && this.props.children}

        <NewProjectModal />

        <Alerts />

      </div>
    )
  }

}

export default Application
