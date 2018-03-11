import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from 'components/Button'
import IconError from 'react-icons/md/error'

import { addSnippet, updateSnippet } from 'actions/snippets'

@connect(
  state => ({
    settings: state.settings,
  }),
  {
    addSnippet,
    updateSnippet,
  },
)
class SnippetForm extends Component {
  state = {
    snippetNameIsAvailable: true,
    snippetTriggerIsAvailable: true,
  }

  handleChangeName = (e, originalName) => {
    const { value } = e.target
    const { settings } = this.props
    const snippets = settings.get('snippets')

    if (snippets.find(s => s.name === value.trim())) {
      if (snippets.find(s => s.name === value.trim()).name !== originalName) {
        this.setState({
          snippetNameIsAvailable: false,
          snippetName: value,
        })
      } else {
        this.setState({
          snippetNameIsAvailable: true,
          snippetName: value,
        })
      }
    } else {
      this.setState({
        snippetNameIsAvailable: true,
        snippetName: value,
      })
    }
  }

  handleChangeTrigger = (e, originalName) => {
    const { value } = e.target
    const { settings } = this.props

    const snippets = settings.get('snippets')

    if (snippets.find(s => s.trigger === value.trim())) {
      if (snippets.find(s => s.trigger === value.trim()).name !== originalName) {
        this.setState({
          snippetTriggerIsAvailable: false,
          snippetTrigger: value,
        })
      } else {
        this.setState({
          snippetTriggerIsAvailable: true,
          snippetTrigger: value,
        })
      }
    } else {
      this.setState({
        snippetTriggerIsAvailable: true,
        snippetTrigger: value,
      })
    }
  }

  handleChangeContent = e => {
    const { value } = e.target
    this.setState({
      snippetContent: value,
    })
  }

  handleSubmit = e => {
    e.preventDefault()
  }

  createSnippet = (snippetName, snippetTrigger, snippetContent) => {
    this.setState({
      snippetName: '',
      snippetTrigger: '',
      snippetContent: '',
    })
    this.props.addSnippet(snippetName.trim(), snippetTrigger.trim(), snippetContent)
  }

  updateSnippet = (oldName, newName, oldTrigger, newTrigger, oldContent, newContent) => {
    this.setState({
      snippetName: newName || oldName,
      snippetTrigger: newTrigger || oldTrigger,
      snippetContent: newContent || oldContent,
    })

    this.props.updateSnippet(oldName, newName.trim(), newTrigger.trim(), newContent)
  }

  render() {
    const {
      snippetName,
      snippetContent,
      snippetTrigger,
      snippetNameIsAvailable,
      snippetTriggerIsAvailable,
    } = this.state

    const { name, trigger, content, snippetIsEdited } = this.props

    return (
      <div>
        <form className="mt-20" onSubmit={this.handleSubmit}>
          <div className="flow-v-20">
            <div className="d-f ai-b">
              <div style={{ width: 120 }} className="fs-0">
                {'Snippet Name:'}
              </div>
              <input
                className="fg-1"
                onChange={e => this.handleChangeName(e, name)}
                placeholder="Name"
                value={snippetName || name}
                type="text"
                autoFocus
              />
            </div>
            {!snippetNameIsAvailable && (
              <div className="t-small mt-10 c-red">
                <IconError className="mr-5 mb-5" />
                <b className="mr-5">{snippetName.trim()}</b>
                {'is already taken'}
              </div>
            )}

            <div className="d-f ai-b">
              <div style={{ width: 120 }} className="fs-0">
                {'Snippet Trigger:'}
              </div>
              <input
                className="fg-1"
                onChange={e => this.handleChangeTrigger(e, name)}
                placeholder="Trigger"
                value={snippetTrigger || trigger}
                type="text"
              />
            </div>
            {!snippetTriggerIsAvailable && (
              <div className="t-small mt-10 c-red">
                <IconError className="mr-5 mb-5" />
                <b className="mr-5">{snippetTrigger.trim()}</b>
                {'is already taken'}
              </div>
            )}
            <div className="d-b">
              <div style={{ width: 120 }} className="fs-0">
                {'Snippet Content:'}
              </div>
              <div className="fg-1 mt-20 mb-20">
                <textarea
                  onChange={this.handleChangeContent}
                  placeholder="Content"
                  value={snippetContent || content}
                  type="text"
                />
              </div>
            </div>
          </div>
        </form>
        {!snippetIsEdited && (
          <Button
            disabled={
              !snippetName ||
              !snippetTrigger ||
              !snippetContent ||
              !snippetNameIsAvailable ||
              !snippetTriggerIsAvailable
            }
            primary
            onClick={() => this.createSnippet(snippetName, snippetTrigger, snippetContent)}
          >
            {'Create Snippet'}
          </Button>
        )}
        {snippetIsEdited && (
          <Button
            primary
            onClick={() =>
              this.updateSnippet(
                name,
                snippetName || name,
                trigger,
                snippetTrigger || trigger,
                content,
                snippetContent || content,
              )
            }
          >
            {'Update Snippet'}
          </Button>
        )}
      </div>
    )
  }
}

export default SnippetForm
