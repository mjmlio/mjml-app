import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  MdExpandMore as IconExpandMore,
  MdExpandLess as IconExpandLess,
  MdDelete as IconDelete,
} from 'react-icons/md'

import { loadSnippet, deleteSnippet } from 'actions/snippets'

import SnippetForm from '../SnippetForm'

export default connect(
  state => ({
    settings: state.settings,
  }),
  {
    loadSnippet,
    deleteSnippet,
  },
)(
  class SnippetItem extends Component {
    state = {
      snippetIsEdited: false,
    }

    handleLoad = () => {
      const { snippetIsEdited } = this.state

      this.setState({
        snippetIsEdited: !snippetIsEdited,
      })
    }

    handleDelete = name => {
      this.props.deleteSnippet(name)
    }

    render() {
      const { name, trigger, content } = this.props

      const { snippetIsEdited } = this.state

      return (
        <div className="SnippetItem">
          <div className="SnippetItem--title">
            <div>
              <b>{name}</b>
            </div>
            <div className="SnippetItem--item-actions">
              <div onClick={this.handleLoad} className="action action-rename">
                {snippetIsEdited && <IconExpandLess />}
                {!snippetIsEdited && <IconExpandMore />}
              </div>
              <div onClick={() => this.handleDelete(name)} className="action action-remove">
                <IconDelete />
              </div>
            </div>
          </div>
          {snippetIsEdited && (
            <SnippetForm
              name={name}
              trigger={trigger}
              content={content}
              snippetIsEdited={snippetIsEdited}
            />
          )}
        </div>
      )
    }
  },
)
