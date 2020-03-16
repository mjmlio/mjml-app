import React, { Component } from 'react'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'
import { get } from 'lodash'

import beautifyJS from 'js-beautify'

import CodeMirror from 'codemirror/lib/codemirror'
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
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/xml-hint'
import 'codemirror/mode/xml/xml'
import 'codemirror/addon/lint/lint'

import 'helpers/codemirror-util-autoformat'

import { addAlert } from 'reducers/alerts'

import isOldSyntax from 'helpers/detectOldMJMLSyntax'

import { codeMirrorCtrlD, codeMirrorDuplicate } from 'helpers/codemirror-shortcuts'

import {
  completeAfter,
  completeIfAfterLt,
  completeIfInTag,
} from 'helpers/codemirror-autocomplete-mjml'

import { completeAfterSnippet } from 'helpers/codemirror-autocomplete-snippets'

import { migrateToMJML4 } from 'helpers/mjml'
import foldByLevel from 'helpers/foldByLevel'
import { fsReadFile, fsWriteFile } from 'helpers/fs'
import { setPreview } from 'actions/preview'

import './styles.scss'

function beautify(content) {
  return beautifyJS.html(content, {
    indent_size: 2, // eslint-disable-line camelcase
    wrap_attributes_indent_size: 2, // eslint-disable-line camelcase
    max_preserve_newline: 0, // eslint-disable-line camelcase
    preserve_newlines: false, // eslint-disable-line camelcase
  })
}

export default connect(
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
      snippets: settings.get('snippets'),
      useTab: settings.getIn(['editor', 'useTab'], false),
      tabSize: settings.getIn(['editor', 'tabSize'], 2),
      indentSize: settings.getIn(['editor', 'indentSize'], 2),
      preventAutoSave: settings.getIn(['editor', 'preventAutoSave'], false),
    }
  },
  {
    setPreview,
    addAlert,
  },
)(
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
        window.requestIdleCallback(this.detecteOldSyntax)
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
      if (prevProps.useTab !== this.props.useTab) {
        this._codeMirror.setOption('indentWithTabs', this.props.useTab)
      }
      if (prevProps.tabSize !== this.props.tabSize) {
        this._codeMirror.setOption('tabSize', this.props.tabSize)
      }
      if (prevProps.indentSize !== this.props.indentSize) {
        this._codeMirror.setOption('indentUnit', this.props.indentSize)
      }
    }

    componentWillUnmount() {
      if (this._codeMirror) {
        this._codeMirror.toTextArea()
        this._codeMirror = null
      }
    }

    detecteOldSyntax = () => {
      const content = this.getContent()
      this.props.onDetectOldSyntax(isOldSyntax(content))
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

    handleCtrlD(cm) {
      codeMirrorCtrlD(cm, this._codeMirror)
    }

    handleCtrlShiftD(cm) {
      codeMirrorDuplicate(cm, this._codeMirror)
    }

    initEditor() {
      if (!this._textarea) {
        return
      }

      const { wrapLines, highlightTag, lightTheme, useTab, tabSize, indentSize } = this.props

      if (this._codeMirror) {
        this._codeMirror.toTextArea()
        this._codeMirror = null
      }

      this._codeMirror = CodeMirror.fromTextArea(this._textarea, {
        tabSize,
        dragDrop: false,
        matchTags: highlightTag ? { bothTags: true } : undefined,
        indentUnit: indentSize,
        indentWithTabs: useTab,
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
          "'<'": (cm, pred) => completeAfter(CodeMirror, cm, pred),
          "'/'": cm => completeIfAfterLt(CodeMirror, cm),
          "' '": cm => completeIfInTag(CodeMirror, cm),
          "'='": cm => completeIfInTag(CodeMirror, cm),
          'Ctrl-Space': 'autocomplete',
          'Ctrl-D': cm => this.handleCtrlD(cm),
          'Cmd-D': cm => this.handleCtrlD(cm),
          'Shift-Ctrl-D': cm => this.handleCtrlShiftD(cm),
          'Shift-Cmd-D': cm => this.handleCtrlShiftD(cm),
          /* eslint-enable quotes */
        },
        lint: this.handleValidate,
      })

      this._codeMirror.on('keydown', (cm, e) => this.handleKey(cm, e))

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

    handleKey = (cm, e) => {
      const { snippets } = this.props
      if (e.key === 'Tab') {
        e.preventDefault()
        return completeAfterSnippet(CodeMirror, cm, snippets)
      }
    }

    async handleSave() {
      const { fileName, addAlert } = this.props
      const mjml = this._codeMirror.getValue()

      try {
        await fsWriteFile(fileName, mjml)
        addAlert('File successfully saved', 'success')
      } catch (e) {
        addAlert('Could not save file', 'error')
        console.log(e) // eslint-disable-line no-console
      }
    }

    handleChange = debounce(async () => {
      const { setPreview, fileName, mjmlEngine, preventAutoSave } = this.props
      const mjml = this._codeMirror.getValue()
      if (mjmlEngine === 'auto') {
        setPreview(fileName, mjml)

        if (!preventAutoSave) this.debounceWrite(fileName, mjml)
      } else {
        if (!preventAutoSave) {
          await fsWriteFile(fileName, mjml)
        }

        setPreview(fileName, mjml)
      }

      window.requestIdleCallback(this.detecteOldSyntax)
    }, 200)

    getContent = () => {
      return this._codeMirror.getValue()
    }

    setContent = content => {
      const scrollInfo = this._codeMirror.getScrollInfo()
      this._codeMirror.setValue(content)
      this._codeMirror.scrollTo(0, scrollInfo.top)
    }

    beautify = () => {
      const value = this.getContent()
      const beautified = beautify(value)
      this.setContent(beautified)
    }

    migrateToMJML4 = () => {
      try {
        const content = this.getContent()
        const migratedContent = migrateToMJML4(content)
        const beautified = beautify(migratedContent)
        this.setContent(beautified)
      } catch (err) {
        console.error(err) // eslint-disable-line no-console
      }
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
          {isLoading && <div className="sticky z FileEditor--loader">{'...'}</div>}
          <textarea ref={r => (this._textarea = r)} />
        </div>
      )
    }
  },
)
