import React, { Component } from 'react'
import { connect } from 'react-redux'

import Placeholder from './Placeholder'
import NewProjectModal from 'components/NewProjectModal'

import './style.scss'

@connect(state => ({
  settings: state.settings,
}))
class Application extends Component {

  render () {

    const {
      settings,
    } = this.props

    return (
      <div className='Application'>

        <Placeholder show={!settings} />
        {settings && this.props.children}

        <NewProjectModal />

      </div>
    )
  }

}

export default Application
