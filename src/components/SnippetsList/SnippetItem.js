import React, { Component } from 'react'
import { connect } from 'react-redux'

@connect(
  state => ({
    settings: state.settings,
  }),
  {}
)

class SnippetItem extends Component {

  render() {
    const { name } = this.props

    return (
      <div className="SnippetItem">
            <b>{name}</b>
      </div>
    )
  }
}

export default SnippetItem
