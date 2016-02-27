import React, { Component } from 'react'
import mjml2html from 'mjml/lib/mjml2html'

import Editor from './Editor'
import defaultContent from '../assets/defaultContent'

import '../styles/EditorPage.scss'

class EditorPage extends Component {

  state = {
    content: defaultContent
  }

  componentDidUpdate () {
    let html
    try {
      html = mjml2html(this.state.content)
    } catch (e) {
      html = this._oldHtml || ''
    }
    const doc = this._iframe.contentDocument
    const documentElement = doc.documentElement
    documentElement.innerHTML = html
    this._oldHtml = html
  }

  handleChange = (content) => {
    this.setState({ content })
  }

  render () {
    const { content } = this.state

    return (
      <div className='EditorPage'>
        <div className='EditorPage-panel'>
          <Editor value={content} onChange={this.handleChange} />
        </div>
        <div className='EditorPage-preview'>
          <iframe id='preview' ref={(el) => this._iframe = el} />
        </div>
      </div>
    )
  }

}

export default EditorPage
