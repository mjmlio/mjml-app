import React, { Component } from 'react'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'
import CodeMirror from 'codemirror'

import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/search/match-highlighter'
import 'codemirror/mode/xml/xml'

import { fsReadFile, fsWriteFile } from 'helpers/fs'

import './styles.scss'

@connect()
class FileEditor extends Component {

  state = {
    isLoading: true,
  }

  componentDidMount () {
    this.initEditor()
    this.loadContent()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.fileName !== this.props.fileName) {
      this.loadContent()
    }
  }

  componentWillUnmount () {
    if (this._codeMirror) {
      this._codeMirror.toTextArea()
      this._codeMirror = null
    }
  }

  loadContent () {
    const { fileName } = this.props
    const { isLoading } = this.state

    if (!isLoading) {
      this.setState({ isLoading: true })
    }

    fsReadFile(fileName, { encoding: 'utf8' }).then(content => {
      this._codeMirror.setValue(content)
      this.setState({
        isLoading: false,
      })
    })
  }

  initEditor () {
    if (this._codeMirror) {
      this._codeMirror.toTextArea()
      this._codeMirror = null
    }
    this._codeMirror = CodeMirror.fromTextArea(this._textarea, {
      mode: 'xml',
      lineNumbers: true,
      theme: 'one-dark',
      autoCloseTags: true,
      styleActiveLine: {
        nonEmpty: true,
      },
      highlightSelectionMatches: {
        wordsOnly: true,
      },
      lineWrapping: true,
    })
    this._codeMirror.on('change', this.handleChange)
  }

  handleChange = debounce(() => {
    const v = this._codeMirror.getValue()
    fsWriteFile(this.props.fileName, v)
    this.props.dispatch({
      type: 'SET_PREVIEW',
      payload: { mjml: v },
    })
  }, 100)

  render () {

    const {
      disablePointer,
    } = this.props

    const {
      isLoading,
    } = this.state

    return (
      <div
        className='FileEditor'
        style={{
          pointerEvents: disablePointer ? 'none' : 'auto',
        }}
      >
        {isLoading && (
          <div className='sticky z FileEditor--loader'>
            {'...'}
          </div>
        )}
        <textarea ref={r => this._textarea = r} />
      </div>
    )
  }

}

export default FileEditor
