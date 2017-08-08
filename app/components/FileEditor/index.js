import React, { Component } from 'react'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'
import get from 'lodash/get'
import CodeMirror from 'codemirror'
import beautifyJS from 'js-beautify'

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
import { setPreview } from 'actions/preview'

import './styles.scss'

@connect(
  state => {
    const { settings, preview } = state
    return {
      mjmlEngine: settings.getIn(['mjml', 'engine'], 'auto'),
      minify: settings.getIn(['mjml', 'minify'], false),
      wrapLines: settings.getIn(['editor', 'wrapLines'], true),
      autoFold: settings.getIn(['editor', 'autoFold']),
      foldLevel: settings.getIn(['editor', 'foldLevel']),
      highlightTag: settings.getIn(['editor', 'highlightTag']),
      lightTheme: settings.getIn(['editor', 'lightTheme'], false),
      errors: get(preview, 'errors', []),
    }
  },
  {
    setPreview,
  },
)
class FileEditor extends Component {
  state = {
    isLoading: true,
  }

  componentWillMount() {
    // used to store different histories, for ability to restore
    // it when switching to another file then switching back
    this._historyCache = {}
  }

  componentDidMount() {
    window.requestIdleCallback(() => {
      this.initEditor()
      this.loadContent()
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.mjmlEngine !== nextProps.mjmlEngine) {
      this.handleChange()
    }
    if (this.props.minify !== nextProps.minify) {
      this.handleChange()
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fileName !== this.props.fileName) {
      // backup history
      this._historyCache[prevProps.fileName] = this._codeMirror.getHistory()
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
    const { fileName, autoFold, foldLevel } = this.props

    const { isLoading } = this.state

    if (!isLoading) {
      this.setState({ isLoading: true })
    }

    try {
      const content = await fsReadFile(fileName, { encoding: 'utf8' })
      if (!this._codeMirror) {
        return
      }
      this._codeMirror.setValue(content)
      // load history if exists, else, clear it.
      if (this._historyCache[fileName]) {
        this._codeMirror.setHistory(this._historyCache[fileName])
      } else {
        this._codeMirror.clearHistory()
      }
      // fold lines on mjml files, based on settings
      if (autoFold && fileName.endsWith('.mjml')) {
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
      lint: this.handleValidate,
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

  handleChange = debounce(async () => {
    const { setPreview, fileName, mjmlEngine } = this.props
    const mjml = this._codeMirror.getValue()
    if (mjmlEngine === 'auto') {
      setPreview(fileName, mjml)
      this.debounceWrite(fileName, mjml)
    } else {
      await fsWriteFile(fileName, mjml)
      setPreview(fileName, mjml)
    }
  }, 200)

  beautify = () => {
    const value = this._codeMirror.getValue()
    const scrollInfo = this._codeMirror.getScrollInfo()
    const beautified = beautifyJS.html(value, {
      indent_size: 2, // eslint-disable-line camelcase
      wrap_attributes_indent_size: 2, // eslint-disable-line camelcase
    })
    this._codeMirror.setValue(beautified)
    this._codeMirror.scrollTo(0, scrollInfo.top)
  }

  debounceWrite = debounce((fileName, mjml) => {
    fsWriteFile(fileName, mjml)
  }, 500)

  refresh = () => {
    this._codeMirror && this._codeMirror.refresh()
  }

  focus = () => {
    this._codeMirror && this._codeMirror.focus()
  }

  render() {
    const { disablePointer, onRef } = this.props

    const { isLoading } = this.state

    onRef(this)

    return (
      <div
        className="FileEditor"
        style={{
          pointerEvents: disablePointer ? 'none' : 'auto',
        }}
      >
        {isLoading &&
          <div className="sticky z FileEditor--loader">
            {'...'}
          </div>}
        <textarea ref={r => (this._textarea = r)} />
      </div>
    )
  }
}

export default FileEditor
