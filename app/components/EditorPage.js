import React, { Component } from 'react'
import { connect } from 'react-redux'
import mjml2html from 'mjml/lib/mjml2html'

import Editor from './Editor'
import { updateTemplate, saveTemplate } from '../actions/template'

import '../styles/EditorPage.scss'

@connect(
  state => ({
    template: state.template
  })
)
class EditorPage extends Component {

  componentDidMount () { this.renderIframe() }
  componentDidUpdate () { this.renderIframe() }

  handleChange = (mjml) => {
    this.props.dispatch(updateTemplate(template => template.set('mjml', mjml)))
    this.props.dispatch(saveTemplate())
  }

  renderIframe () {
    const { template } = this.props
    if (!template) { return }
    let html
    try {
      html = mjml2html(template.get('mjml'))
    } catch (e) {
      html = this._oldHtml || ''
    }
    const doc = this._iframe.contentDocument
    const documentElement = doc.documentElement
    documentElement.innerHTML = html
    this._oldHtml = html
  }

  renderEmpty () {
    return (
      <div>
        {'No template selected. You should not be here.'}
      </div>
    )
  }

  render () {
    const { template } = this.props

    if (!template) { return this.renderEmpty() }

    const mjml = template.get('mjml')

    return (
      <div className='EditorPage'>
        <div className='EditorPage-panel'>
          <Editor value={mjml} onChange={this.handleChange} />
        </div>
        <div className='EditorPage-preview'>
          <iframe id='preview' ref={(el) => this._iframe = el} />
        </div>
      </div>
    )
  }

}

export default EditorPage
