import React, { Component } from 'react'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'
import IconBeautify from 'react-icons/md/autorenew'
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
import 'helpers/codemirror-util-autoformat'

import foldByLevel from 'helpers/foldByLevel'
import { fsReadFile, fsWriteFile } from 'helpers/fs'
import { setPreview } from 'actions/preview'
import Button from 'components/Button'

import './styles.scss'

@connect(state => {
  const { settings } = state
  return {
    mjmlEngine: settings.getIn(['mjml', 'engine'], 'auto'),
    wrapLines: settings.getIn(['editor', 'wrapLines'], true),
    autoFold: settings.getIn(['editor', 'autoFold']),
    foldLevel: settings.getIn(['editor', 'foldLevel']),
  }
}, {
  setPreview,
}, null, { withRef: true })
class FileEditor extends Component {

  state = {
    isLoading: true,
  }

  componentWillMount () {
    // used to store different histories, for ability to restore
    // it when switching to another file then switching back
    this._historyCache = {}
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
      // backup history
      this._historyCache[prevProps.fileName] = this._codeMirror.getHistory()
      this.loadContent()
    }
    if (prevProps.wrapLines !== this.props.wrapLines) {
      this._codeMirror.setOption('lineWrapping', this.props.wrapLines)
    }
    if (
      (!prevProps.autoFold && this.props.autoFold)
      || (this.props.autoFold && (this.props.foldLevel !== prevProps.foldLevel))
    ) {
      foldByLevel(this._codeMirror, this.props.foldLevel)
    }
  }

  componentWillUnmount () {
    if (this._codeMirror) {
      this._codeMirror.toTextArea()
      this._codeMirror = null
    }
  }

  async loadContent () {

    const {
      fileName,
      autoFold,
      foldLevel,
    } = this.props

    const { isLoading } = this.state

    if (!isLoading) {
      this.setState({ isLoading: true })
    }

    try {
      const content = await fsReadFile(fileName, { encoding: 'utf8' })
      if (!this._codeMirror) { return }
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

  handleBeautify = () => {
    const totalLines = this._codeMirror.lineCount()
    const totalChars = this._codeMirror.getTextArea().value.length
    this._codeMirror.autoFormatRange({ line: 0, ch: 0 }, { line: totalLines, ch: totalChars })
    this._codeMirror.setCursor({ line: 0, ch: 0 })
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
        <div className='FileEditor--actions'>
          <Button
            ghost
            className='r'
            data-balloon='Beautify MJML'
            data-balloon-pos='down'
            onClick={this.handleBeautify}
          >
            <IconBeautify />
          </Button>
        </div>
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
