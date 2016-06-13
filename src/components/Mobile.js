import React, { Component } from 'react'

import Iframe from 'components/Iframe'

import 'styles/Mobile.scss'

class Mobile extends Component {

  render () {
    return (
      <div className='Phone-container'>
        <div id='phone'>
          <div id='home'></div>
          <div id='speaker'></div>
          <div id='screen'>
            <Iframe
              scroll={this.props.scroll}
              onScroll={this.props.onScroll}
              template={this.props.template} />
          </div>
        </div>
      </div>
    )
  }
}

export default Mobile
