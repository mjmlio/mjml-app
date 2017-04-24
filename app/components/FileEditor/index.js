import React, { Component } from 'react'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'
import CodeMirror from 'codemirror'

import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/search/match-highlighter'
import 'codemirror/addon/search/search'
import 'codemirror/addon/search/searchcursor'
import 'codemirror/addon/search/jump-to-line'
import 'codemirror/addon/dialog/dialog'
import 'codemirror/addon/scroll/annotatescrollbar'
import 'codemirror/addon/search/matchesonscrollbar'
import 'codemirror/mode/xml/xml'

import { fsReadFile, fsWriteFile } from 'helpers/fs'
import { setPreview } from 'actions/preview'

import './styles.scss'

@connect(state => {
  const { settings } = state
  return {
    mjmlEngine: settings.getIn(['mjml', 'engine'], 'auto'),
    wrapLines: settings.getIn(['editor', 'wrapLines'], true),
  }
}, {
  setPreview,
}, null, { withRef: true })
class FileEditor extends Component {

  state = {
    isLoading: true,
  }

  componentDidMount () {
    window.requestIdleCallback(() => {
      this.initEditor()
      this.loadContent()
    })
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.mjmlEngine !== nextProps.mjmlEngine) {
      this.handleChange()
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.fileName !== this.props.fileName) {
      this.loadContent()
    }
    if (prevProps.wrapLines !== this.props.wrapLines) {
      this._codeMirror.setOption('lineWrapping', this.props.wrapLines)
    }
  }

  componentWillUnmount () {
    if (this._codeMirror) {
      this._codeMirror.toTextArea()
      this._codeMirror = null
    }
  }

  async loadContent () {
    const { fileName } = this.props
    const { isLoading } = this.state

    if (!isLoading) {
      this.setState({ isLoading: true })
    }

    try {
      const content = await fsReadFile(fileName, { encoding: 'utf8' })
      if (!this._codeMirror) { return }
      this._codeMirror.setValue(content)
      this.setState({ isLoading: false })
    } catch (e) {} // eslint-disable-line

  }

  initEditor () {

    const {
      wrapLines,
    } = this.props

    if (this._codeMirror) {
      this._codeMirror.toTextArea()
      this._codeMirror = null
    }
    this._codeMirror = CodeMirror.fromTextArea(this._textarea, {
      indentUnit: 2,
      tabSize: 2,
      indentWithTabs: false,
      mode: 'xml',
      lineNumbers: true,
      theme: 'one-dark',
      autoCloseTags: true,
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      styleActiveLine: {
        nonEmpty: true,
      },
      highlightSelectionMatches: {
        wordsOnly: true,
      },
      lineWrapping: wrapLines,
    })
    this._codeMirror.on('change', this.handleChange)
  }

  handleChange = debounce(async () => {
    const {
      setPreview,
      fileName,
      mjmlEngine,
    } = this.props
    const mjml = this._codeMirror.getValue()
    if (mjmlEngine === 'auto') {
      setPreview(fileName, mjml)
      this.debounceWrite(fileName, mjml)
    } else {
      await fsWriteFile(fileName, mjml)
      setPreview(fileName, mjml)
    }
  }, 200)

  debounceWrite = debounce((fileName, mjml) => {
    fsWriteFile(fileName, mjml)
  }, 500)

  refresh = () => {
    this._codeMirror && this._codeMirror.refresh()
  }

  focus = () => {
    this._codeMirror && this._codeMirror.focus()
  }

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
