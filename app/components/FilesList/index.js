import React, { Component } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import pathModule from 'path'
import SplitPane from 'react-split-pane'
import FaFolder from 'react-icons/fa/folder'
import FaHome from 'react-icons/fa/home'
import FaPlus from 'react-icons/fa/plus'

import { readDir, sortFiles } from 'helpers/fs'

import FileEditor from 'components/FileEditor'
import FilePreview from './FilePreview'
import Button from 'components/Button'

import './styles.scss'

@connect()
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
    if (this.props.focusHome) {
      this._btnHome.focus()
    }
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
    this.props.dispatch({
      type: 'SET_PREVIEW',
      payload: { file: p },
    })
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
      if (files.length && !this._hasFocused) {
        this.props.onActiveFileChange(files[0])
        this._hasFocused = true
      }
    })
  }

  startDrag = () => this.setState({ isDragging: true })
  stopDrag = () => this.setState({ isDragging: false })

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
        <div className='d-f ai-c fs-0 mb-10'>
          <div className='FilesList--ariane'>
            <Button
              transparent
              link
              to='/'
              ref={n => this._btnHome = n}
            >
              <FaHome />
            </Button>
            <Button
              style={{
                padding: '0 5px',
              }}
              transparent
              unclickable={pathItems.length === 0}
              onClick={this.handleClickDirectFactory(pathItems, -1)}
            >
              <span className='round-label'>
                {rootPathItems[rootPathItems.length - 1]}
              </span>
            </Button>
            {pathItems.map((item, i) => (
              <Button
                transparent
                unclickable={i === pathItems.length - 1}
                key={item}
                onClick={this.handleClickDirectFactory(pathItems, i)}
              >
                {item}
              </Button>
            ))}
          </div>

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

          {children && (
            <div style={{ marginLeft: 'auto' }}>
              {children}
            </div>
          )}
        </div>
        <div className='rel fg-1'>
          <SplitPane
            split='vertical'
            defaultSize={300}
            onDragStarted={this.startDrag}
            onDragFinished={this.stopDrag}
          >
            <div className='rel FilesList--list'>
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
              defaultSize='50%'
              onDragStarted={this.startDrag}
              onDragFinished={this.stopDrag}
            >
              <div className='d-f fd-c sticky'>
                {activeFile && activeFile.name.endsWith('.mjml') && (
                  <FileEditor
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
