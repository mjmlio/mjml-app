import React, { Component } from 'react'
//import mjml from 'mjml'

import '../styles/Editor.css'

export default class Home extends Component {

  state = {
    content: ''
  }

  handleChange = (e) => {
    this.setState({ content: e.target.value })
  }

  render () {
    const { content } = this.state

    return (
      <div>
        <div className='Editor'>
          <div className='Editor-panel'>
            <textarea value={content} onChange={this.handleChange} />
          </div>
          <div className='Editor-panel'>
            {content}
          </div>
        </div>
      </div>
    )
  }

}
