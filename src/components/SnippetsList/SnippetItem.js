import React, { Component } from 'react'
import { connect } from 'react-redux'

import IconEdit from 'react-icons/md/mode-edit'
import IconClose from 'react-icons/md/close'

import { loadSnippet, deleteSnippet } from 'actions/snippets'

@connect(
  state => ({
    settings: state.settings,
  }),
  {
    loadSnippet,
    deleteSnippet
  },
)
class SnippetItem extends Component {

  handleLoad = (name, trigger, content) => {
    this.props.loadSnippet(name, trigger, content)
  }

  handleDelete = name => {
    this.props.deleteSnippet(name)
  }

  render() {
    const { name, trigger, content } = this.props

    return (
      <div className="SnippetItem">
        <div>
          <b>{name}</b>
        </div>
        <div className="SnippetItem--item-actions">
          <div
            tabIndex={0}
            onClick={() => this.handleLoad(name, trigger, content)}
            className="action action-rename"
          >
            <IconEdit />
          </div>
          <div
            onClick={() => this.handleDelete(name)}
            className="action action-remove"
          >
            <IconClose />
          </div>
        </div>
      </div>
    )
  }
}

export default SnippetItem
