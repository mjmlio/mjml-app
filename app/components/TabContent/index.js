import React, { Component } from 'react'
import { connect } from 'react-redux'

import './style.scss'

@connect(state => ({
  currentTab: state.tabs.find(t => t.get('isFocused')) || null,
}))
class TabContent extends Component {

  renderTab () {

    const {
      currentTab,
    } = this.props

    return (
      <div>
        onetuhoen
      </div>
    )
  }

  render () {

    const {
      currentTab,
    } = this.props

    return (
      <div className='TabContent sticky'>
        {currentTab ? this.renderTab() : (
          <div className='sticky z TabContent-empty'>
            {'Nothing selected.'}
          </div>
        )}
      </div>
    )
  }

}

export default TabContent
