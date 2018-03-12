import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loadSnippet } from 'actions/snippets'

@connect(
  state => ({
    settings: state.settings,
  }),
  {
    loadSnippet
  },
)
class SnippetItem extends Component {

  handleLoad = name => {
    this.props.loadSnippet(name)
  }

  render() {
    const { name } = this.props

    return (
      <div className="SnippetItem" onClick={() => this.handleLoad(name)}>
        <b>{name}</b>
      </div>
    )
  }
}

export default SnippetItem
