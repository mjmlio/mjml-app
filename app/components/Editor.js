import React, { Component } from 'react'
import AceEditor from 'react-ace'

import 'brace/mode/xml'
import 'brace/theme/solarized_dark'

import '../styles/Editor.scss'

class Editor extends Component {

  state = {
    content: '<mj-body></mj-body>'
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
              value={content}
              tabSize={2}
              onChange={this.handleChange}
              name='editor'
              editorProps={{ $blockScrolling: true }}/>
          </div>
          <div className='Editor-panel Editor-preview'>
            {content}
          </div>
        </div>
      </div>
    )
  }

}

export default Editor
