import React, { Component } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import mjml2html from 'mjml/lib/mjml2html'

import Editor from './Editor'
import { updateTemplate, saveTemplate } from '../actions/template'
import aceThemes from '../assets/aceThemes'

import '../styles/EditorPage.scss'

@connect(
  state => ({
    template: state.template
  })
)
class EditorPage extends Component {

  state = {
    showPreview: true,
    editorTheme: aceThemes[0][0]
  }

  componentDidMount () { this.renderIframe() }
  componentDidUpdate () { this.renderIframe() }

  handleChange = (mjml) => {
    this.props.dispatch(updateTemplate(template => template.set('mjml', mjml)))
    this.props.dispatch(saveTemplate())
  }

  togglePreview = () => {
    this.setState({ showPreview: !this.state.showPreview })
  }

  setTheme = e => {
    this.setState({ editorTheme: e.target.value })
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
    if (html === this._oldHtml) { return }
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
    const { showPreview, editorTheme } = this.state

    if (!template) { return this.renderEmpty() }

    const mjml = template.get('mjml')

    return (
      <div className='EditorPage'>
        <div className='EditorPage-bar'>

          <select onChange={this.setTheme}>
            {aceThemes.map(theme =>
              <option value={theme[0]}>{theme[1]}</option>)}
          </select>

          <div className='EditorPage-bar-side'>
            <label>
              <input type='checkbox' checked={showPreview} onChange={this.togglePreview} />
              {' Preview'}
            </label>
          </div>
        </div>
        <div className='EditorPage-view'>
          <div className='EditorPage-panel'>
            <Editor
              value={mjml}
              theme={editorTheme}
              onChange={this.handleChange} />
          </div>
          <div className={cx('EditorPage-preview', { show: showPreview })}>
            <iframe id='preview' ref={(el) => this._iframe = el} />
          </div>
        </div>
      </div>
    )
  }

}

export default EditorPage
