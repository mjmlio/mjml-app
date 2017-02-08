import React, { Component } from 'react'
import { connect } from 'react-redux'

import AppPlaceholder from 'components/AppPlaceholder'

import './style.scss'

@connect(state => ({
  config: state.config,
}))
class Application extends Component {

  render () {

    const {
      config,
    } = this.props

    return (
      <div className='Application'>
        {config ? this.props.children : <AppPlaceholder />}
      </div>
    )
  }

}

export default Application
