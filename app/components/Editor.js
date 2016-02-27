import React, { Component } from 'react'
import AceEditor from 'react-ace'
import { debounce } from 'lodash'

import 'brace/mode/xml'
import 'brace/theme/solarized_dark'

import '../styles/Editor.scss'

class Editor extends Component {

  constructor (props) {
    super(props)

    this.state = {
      content: props.value
    }
  }

  static aceProps = {
    $blockScrolling: true
  }

  saveContent = debounce((content) => {
    this.props.onChange(content)
  }, 500)

  handleChange = (content) => {
    this.setState({ content })
    this.saveContent(content)
  }

  render () {
    const { content } = this.state

    return (
      <div className='Editor'>
        <AceEditor
          mode='xml'
          theme='solarized_dark'
          height='100%'
          value={content}
          tabSize={2}
          onChange={this.handleChange}
          name='editor'
          editorProps={Editor.aceProps}/>
      </div>
    )
  }

}

export default Editor
