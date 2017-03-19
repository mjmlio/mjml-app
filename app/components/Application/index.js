import React, { Component } from 'react'
import { connect } from 'react-redux'

import AppPlaceholder from 'components/AppPlaceholder'

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
        {settings ? this.props.children : <AppPlaceholder />}
      </div>
    )
  }

}

export default Application
