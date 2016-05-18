import React, { Component } from 'react'
import { connect } from 'react-redux'

import Iframe from 'components/Iframe'

@connect(
  state => ({
    template: state.templates.getIn(['list', state.templates.get('list').findIndex(
      template => template.get('id') === state.templates.get('current')
    )]),
  })
)
class Desktop extends Component {

  render () {
    return (
      <div className='Preview-container'>
        <Iframe template={this.props.template} />
      </div>
    )
  }
}

export default Desktop
