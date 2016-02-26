import React, { Component } from 'react'
import AceEditor from 'react-ace'
import mjml2html from 'mjml/lib/mjml2html'

import 'brace/mode/xml'
import 'brace/theme/solarized_dark'

import '../styles/Editor.css'

export default class Home extends Component {

  static aceProps = {
    $blockScrolling: true
  }

  state = {
    content: ''
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
      <div>
        <div className='Editor'>
          <div className='Editor-panel'>
            <AceEditor
              mode='xml'
              theme='solarized_dark'
              height={window.innerHeight}
              value={content}
              tabSize={2}
              onChange={this.handleChange}
              name='editor'
              editorProps={Home.aceProps}/>
          </div>
          <div className='Editor-preview'>
            <iframe id='preview' ref={(el) => this._iframe = el} />
          </div>
        </div>
      </div>
    )
  }

}
