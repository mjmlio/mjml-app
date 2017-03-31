import React, { Component } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import pathModule from 'path'
import SplitPane from 'react-split-pane'
import FaFolder from 'react-icons/fa/folder'
import FaPlus from 'react-icons/fa/plus'

import { readDir, sortFiles } from 'helpers/fs'
import { setPreview } from 'actions/preview'

import FileEditor from 'components/FileEditor'
import FilePreview from './FilePreview'
import Button from 'components/Button'

import './styles.scss'

@connect(null, {
  setPreview,
}, null, { withRef: true })
class FilesList extends Component {

  state = {
    isLoading: true,
    isAdding: false,
    files: [],
    preview: null,
    editingFile: null,
    isDragging: false,
  }

  componentWillMount () {
    this._hasFocused = false
  }

  componentDidMount () {
    this.refresh()
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.path !== this.props.path) {
      this.refresh()
    }
    if (!prevState.isAdding && this.state.isAdding) {
      this._inputName.focus()
    }
    if (this.state.files.length > prevState.files.length && this._lastCreated) {
      this._refs[this._lastCreated].focus()
    }
  }

  componentWillUnmount () {
    this._unmounted = true
  }

  handleSubmit = e => {
    e.preventDefault()
    const { path, onAddFile, onActiveFileChange } = this.props
    let name = this._inputName.value
    if (!name) { return }
    name = `${name}.mjml`
    const fileName = pathModule.join(path, name)
    onAddFile(fileName)
    onActiveFileChange({
      isFolder: false,
      name,
    })
    this._lastCreated = name
    this.toggleAdding()
  }

  handleClickFactory = f => () => {
    const p = pathModule.join(this.props.path, f.name)
    if (f.isFolder) {
      return this.props.onPathChange(p)
    }
    if (this.props.onFileClick) {
      this.props.onFileClick(p)
    }
    // preview will be set by the onChange on editor
    // no need to trigger it here
    if (!p.endsWith('.mjml')) {
      this.props.setPreview(p)
    }
    this.props.onActiveFileChange(f)
  }

  handleDoubleClickFactory = f => () => {
    if (!this.props.onFileDoubleClick) { return }
    if (f.isFolder) { return }
    const p = pathModule.join(this.props.path, f.name)
    return this.props.onFileDoubleClick(p)
  }

  handleClickDirectFactory = (items, i) => () => {
    const sub = items.slice(0, i + 1)
    const relativePath = sub.join(pathModule.sep)
    const path = pathModule.join(this.props.rootPath, relativePath)
    this.props.onPathChange(path)
  }

  handleRemoveFileFactory = f => e => {
    if (e) { e.preventDefault() }
    const p = pathModule.join(this.props.path, f.name)
    this.props.onRemoveFile(p)
  }

  handleNavigateUp = () => {
    this.props.onPathChange(pathModule.dirname(this.props.path))
  }

  refsFactory = () => {
    this._refs = {}
    return refName => node => {
      this._refs[refName] = node
    }
  }

  refresh = () => {
    const { path } = this.props
    readDir(path).then(files => {
      if (this._unmounted) { return }
      sortFiles(files)
      this.setState({
        isLoading: false,
        files,
      })
      window.requestIdleCallback(() => {
        if (files.length && !this._hasFocused) {
          const indexOfIndexFile = files.findIndex(f => f.name === 'index.mjml')
          this.props.onActiveFileChange(files[indexOfIndexFile === -1 ? 0 : indexOfIndexFile])
          this._hasFocused = true
        }
      })
    })
  }

  startDrag = () => this.setState({ isDragging: true })
  stopDrag = () => {
    this.setState({ isDragging: false })
    const editor = this._editor.getWrappedInstance()
    editor.refresh()
    editor.focus()
  }

  toggleAdding = e => {
    if (e) { e.preventDefault() }
    this.setState(s => ({ isAdding: !s.isAdding }))
  }

  cancelAdd = e => {
    if (e) { e.preventDefault() }
    this.setState(s => ({ isAdding: !s.isAdding }), () => {
      this._addBtn.focus()
    })
  }

  render () {

    const {
      files,
      isAdding,
      isDragging,
    } = this.state

    const {
      activeFile,
      path,
      rootPath,
      children,
    } = this.props

    const setRef = this.refsFactory()

    const rootPathItems = rootPath.split(pathModule.sep)
    const pathItems = path
      .split(pathModule.sep)
      .slice(rootPathItems.length)

    const fullActiveFile = pathModule.join(path, (activeFile && activeFile.name) || '')

    return (
      <div className='fg-1 d-f fd-c'>

          {/*}
          <div className='ml-10'>
            {isAdding ? (
              <form onSubmit={this.handleSubmit} className='d-f ai-c'>
                <input
                  type='text'
                  placeholder='filename'
                  ref={n => this._inputName = n}
                />
                <div className='small ml-5 c-yellow'>
                  {'.mjml'}
                </div>
                <div className='small ml-10 d-f ai-c flow-h-10'>
                  <div>{' - '}</div>
                  <a
                    href=''
                    className='a c-red'
                    onClick={this.cancelAdd}
                    tabIndex={0}
                  >
                    {'Cancel'}
                  </a>
                </div>
              </form>
            ) : (
              <Button
                ghost
                onClick={this.toggleAdding}
                className='c-blue'
                ref={n => this._addBtn = n}
              >
                <FaPlus style={{ marginRight: 5 }} />
                {'Add file'}
              </Button>
            )}
          </div>
          */}

        <div className='rel fg-1'>
          <SplitPane
            split='vertical'
            defaultSize={180}
            onDragStarted={this.startDrag}
            onDragFinished={this.stopDrag}
          >
            <div className='rel FilesList--list'>
              {!!pathItems.length && (
                <button
                  className='FilesList--file d-f ai-c'
                  tabIndex={0}
                  onClick={this.handleNavigateUp}
                >
                  <div className='fg-1 FilesList--item-name-container'>
                    <div className='FilesList--item-name'>
                      {'..'}
                    </div>
                  </div>
                </button>
              )}
              {files.map(f => (
                <button
                  ref={setRef(f.name)}
                  key={f.name}
                  className={cx('FilesList--file d-f ai-c', {
                    active: activeFile && activeFile.name === f.name,
                  })}
                  tabIndex={0}
                  onClick={this.handleClickFactory(f)}
                  onDoubleClick={this.handleDoubleClickFactory(f)}
                >
                  {f.isFolder && (
                    <div className='fs-0 pr-10'>
                      <FaFolder />
                    </div>
                  )}
                  <div className='fg-1 FilesList--item-name-container'>
                    <div className='FilesList--item-name'>
                      {f.name}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <SplitPane
              split='vertical'
              defaultSize={500}
              maxSize={650}
              minSize={300}
              primary='second'
              onDragStarted={this.startDrag}
              onDragFinished={this.stopDrag}
            >
              <div className='d-f fd-c sticky'>
                {activeFile && activeFile.name.endsWith('.mjml') && (
                  <FileEditor
                    ref={n => this._editor = n}
                    fileName={fullActiveFile}
                    disablePointer={isDragging}
                  />
                )}
              </div>
              <div className='sticky fs-0 ml-5 rel FilesList--preview-container'>
                <FilePreview disablePointer={isDragging} />
              </div>
            </SplitPane>
          </SplitPane>
        </div>
      </div>
    )
  }

}

export default FilesList
