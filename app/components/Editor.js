import React, { Component } from 'react'
import AceEditor from 'react-ace'
import { debounce } from 'lodash'
import { connect } from 'react-redux'

import { registerShortcuts } from '../actions/editor'

import 'brace/ext/searchbox'
import 'brace/mode/xml'
import 'brace/theme/ambiance'
import 'brace/theme/chaos'
import 'brace/theme/chrome'
import 'brace/theme/clouds'
import 'brace/theme/clouds_midnight'
import 'brace/theme/cobalt'
import 'brace/theme/crimson_editor'
import 'brace/theme/dawn'
import 'brace/theme/dreamweaver'
import 'brace/theme/eclipse'
import 'brace/theme/github'
import 'brace/theme/idle_fingers'
import 'brace/theme/iplastic'
import 'brace/theme/katzenmilch'
import 'brace/theme/kr_theme'
import 'brace/theme/kuroir'
import 'brace/theme/merbivore'
import 'brace/theme/merbivore_soft'
import 'brace/theme/mono_industrial'
import 'brace/theme/monokai'
import 'brace/theme/pastel_on_dark'
import 'brace/theme/solarized_dark'
import 'brace/theme/solarized_light'
import 'brace/theme/sqlserver'
import 'brace/theme/terminal'
import 'brace/theme/textmate'
import 'brace/theme/tomorrow'
import 'brace/theme/tomorrow_night'
import 'brace/theme/tomorrow_night_blue'
import 'brace/theme/tomorrow_night_bright'
import 'brace/theme/tomorrow_night_eighties'
import 'brace/theme/twilight'
import 'brace/theme/vibrant_ink'
import 'brace/theme/xcode'

import '../styles/Editor.scss'

@connect()
class Editor extends Component {

  constructor (props) {
    super(props)

    this.state = {
      content: props.value
    }
  }

  componentDidMount () {
    const editor = this.refs.ace.editor
    const register = (s) => editor.commands.addCommand(s)
    this.props.dispatch(registerShortcuts(register))
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
    const { theme } = this.props

    return (
      <div className='Editor'>
        <AceEditor
          ref='ace'
          mode='xml'
          theme={theme}
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
