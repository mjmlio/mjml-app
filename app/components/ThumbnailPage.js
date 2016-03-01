import React, { Component } from 'react'
import { provideHooks } from 'redial'
import { connect } from 'react-redux'

import { readAndSelect } from '../actions/templates'

@connect(({ templates }) => ({ template: templates.current }))
@provideHooks({
  fetch: ({ dispatch, params: { id } }) => dispatch(readAndSelect(id))
})
class ThumbnailPage extends Component {

  componentDidMount () {
    const { template } = this.props
    console.log(template)
    const html = template.get('html')
    const doc = this._iframe.contentDocument
    const documentElement = doc.documentElement
    documentElement.innerHTML = html
  }

  render () {
    return (
      <div className='Thumbnail'>
        <iframe
          ref={(el) => this._iframe = el} />
      </div>
    )
  }

}

export default ThumbnailPage
