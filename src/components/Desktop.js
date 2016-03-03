
import React, { Component } from 'react'
import { connect } from 'react-redux'

import '../styles/Desktop.scss'

@connect(
  state => ({
    template: state.templates.getIn(['list', state.templates.get('list').findIndex(
      template => template.get('id') === state.templates.get('current')
    )])
  })
)
class Desktop extends Component {

  componentDidMount () { this.renderIframe() }
  componentDidUpdate () { this.renderIframe() }

  renderIframe () {
    const { template } = this.props
    if (!template) { return }
    const html = template.get('html')
    if (html === this._oldHtml) { return }
    const doc = this._iframe.contentDocument
    const documentElement = doc.documentElement
    documentElement.innerHTML = html
    this._oldHtml = html
  }

  render () {
    return (
      <div className='container'>
        <iframe className='preview' ref={(el) => this._iframe = el} />
      </div>
    )
  }
}

export default Desktop
