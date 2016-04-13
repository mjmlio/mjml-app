import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { createNewTemplate, open } from '../actions/templates'
import { comingSoon } from '../actions/'

import '../styles/SideBar.scss'

// strange bug: forced to put the connect as pure false
// because component was not updated on route change
/* eslint-disable no-undefined */
@connect(undefined, undefined, undefined, { pure: false })
class SideBar extends Component {
/* eslint-enable no-undefined */

  /**
   * Creates a new template
   *
   * @returns {undefined}
   */
  createNew = () => {
    this.props.dispatch(createNewTemplate())
  }

  /**
   * Opens an mjml template through the open dialog window
   *
   * @returns {undefined}
   */
  open = () => {
    this.props.dispatch(open())
  }

  /**
   * Redirect to the comming soon page
   *
   * @returns {undefined}
   */
  comingSoon = () => {
    this.props.dispatch(comingSoon())
  }

  render () {
    return (
      <div className='SideBar'>

        <Link
          to='/browse/templates'
          activeClassName='active'
          className='SideBar-section'>
          {'My Templates'}
        </Link>

        <Link
          to='/browse/presets'
          activeClassName='active'
          className='SideBar-section'>
          {'Gallery'}
        </Link>

        <div className='Sidebar-divider' />

        <div className='SideBar-section action'>
          <div onClick={this.createNew}>
            <i className='ion-android-add-circle' />
            {'New'}
          </div>
        </div>

        <div className='SideBar-section action'>
          <div onClick={this.open}>
            <i className='ion-android-folder-open' />
            {'Open'}
          </div>
        </div>
      </div>
    )
  }
}

export default SideBar
