import React, { Component } from 'react'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'
import get from 'lodash/get'
import CodeMirror from 'codemirror'

import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/matchtags'
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
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/xml-hint'
import 'codemirror/addon/lint/lint'
import 'helpers/codemirror-util-autoformat'

import {
  autocompleteTags,
  completeAfter,
  completeIfAfterLt,
  completeIfInTag,
} from 'helpers/codemirror-autocomplete-mjml'

import foldByLevel from 'helpers/foldByLevel'
import { fsReadFile, fsWriteFile } from 'helpers/fs'

import './styles.scss'

@connect(state => {
  const { settings } = state
  return {
    minify: settings.getIn(['mjml', 'minify']),
    wrapLines: settings.getIn(['editor', 'wrapLines']),
    autoFold: settings.getIn(['editor', 'autoFold']),
    foldLevel: settings.getIn(['editor', 'foldLevel']),
    highlightTag: settings.getIn(['editor', 'highlightTag']),
    lightTheme: settings.getIn(['editor', 'lightTheme']),
    // errors: get(preview, 'errors', []),
  }
}, {})
class CodeEditor extends Component {
  state = {
    isLoading: true,
  }

  componentDidMount() {
    window.requestIdleCallback(() => {
      this.initEditor()
      this.loadContent()
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.minify !== nextProps.minify) {
      this.handleChange()
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filePath !== this.props.filePath) {
      this.loadContent()
    }
    if (prevProps.wrapLines !== this.props.wrapLines) {
      this._codeMirror.setOption('lineWrapping', this.props.wrapLines)
    }
    if (prevProps.highlightTag !== this.props.highlightTag) {
      this._codeMirror.setOption(
        'matchTags',
        this.props.highlightTag ? { bothTags: true } : undefined,
      )
    }
    if (
      (!prevProps.autoFold && this.props.autoFold) ||
      (this.props.autoFold && this.props.foldLevel !== prevProps.foldLevel)
    ) {
      foldByLevel(this._codeMirror, this.props.foldLevel)
    }
    if (prevProps.lightTheme !== this.props.lightTheme) {
      this._codeMirror.setOption('theme', this.props.lightTheme ? 'neo' : 'one-dark')
    }
  }

  componentWillUnmount() {
    if (this._codeMirror) {
      this._codeMirror.toTextArea()
      this._codeMirror = null
    }
  }

  async loadContent() {
    const { filePath, autoFold, foldLevel } = this.props

    const { isLoading } = this.state

    if (!isLoading) {
      this.setState({ isLoading: true })
    }

    try {
      const content = await fsReadFile(filePath, { encoding: 'utf8' })

      this._codeMirror.setValue(content)

      // fold lines on mjml files, based on settings
      if (autoFold && filePath.endsWith('.mjml')) {
        foldByLevel(this._codeMirror, foldLevel)
      }

      this.setState({ isLoading: false })
    } catch (e) {} // eslint-disable-line
  }

  initEditor() {
    if (!this._textarea) {
      return
    }

    const { wrapLines, highlightTag, lightTheme } = this.props

    if (this._codeMirror) {
      this._codeMirror.toTextArea()
      this._codeMirror = null
    }

    this._codeMirror = CodeMirror.fromTextArea(this._textarea, {
      dragDrop: false,
      matchTags: highlightTag ? { bothTags: true } : undefined,
      indentUnit: 2,
      tabSize: 2,
      indentWithTabs: false,
      mode: 'xml',
      lineNumbers: true,
      theme: lightTheme ? 'neo' : 'one-dark',
      autoCloseTags: true,
      foldGutter: true,
      gutters: ['CodeMirror-lint-markers', 'CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      styleActiveLine: {
        nonEmpty: true,
      },
      highlightSelectionMatches: {
        wordsOnly: true,
      },
      lineWrapping: wrapLines,
      extraKeys: {
        /* eslint-disable quotes */
        "'<'": completeAfter,
        "'/'": completeIfAfterLt,
        "' '": completeIfInTag,
        "'='": completeIfInTag,
        'Ctrl-Space': 'autocomplete',
        /* eslint-enable quotes */
      },
      hintOptions: {
        schemaInfo: autocompleteTags,
      },
      // lint: this.handleValidate,
    })

    this._codeMirror.on('change', this.handleChange)
  }

  handleValidate = () => {
    const { errors } = this.props
    return errors.map(err => ({
      message: err.message,
      severity: 'error',
      from: CodeMirror.Pos(err.line - 1, 1),
      to: CodeMirror.Pos(err.line - 1, 1),
    }))
  }

  handleChange = debounce(() => {
    if (!this._codeMirror) {
      return
    }
    const { onChange } = this.props
    const content = this._codeMirror.getValue()
    onChange(content)
  }, 200)

  beautify = () => {
    const totalLines = this._codeMirror.lineCount()
    const totalChars = this._codeMirror.getTextArea().value.length
    this._codeMirror.autoFormatRange({ line: 0, ch: 0 }, { line: totalLines, ch: totalChars })
    this._codeMirror.setCursor({ line: 0, ch: 0 })
  }

  refresh = () => {
    this._codeMirror && this._codeMirror.refresh()
  }

  focus = () => {
    this._codeMirror && this._codeMirror.focus()
  }

  render() {
    const { disablePointer, onRef } = this.props

    const { isLoading } = this.state

    onRef && onRef(this)

    return (
      <div
        className="CodeEditor sticky"
        style={{
          pointerEvents: disablePointer ? 'none' : 'auto',
        }}
      >
        {isLoading &&
          <div className="sticky z CodeEditor--loader">
            {'...'}
          </div>}
        <textarea ref={r => (this._textarea = r)} />
      </div>
    )
  }
}

export default CodeEditor
