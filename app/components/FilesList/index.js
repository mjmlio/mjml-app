import React, { Component } from 'react'
import { ipcRenderer } from 'electron'
import { connect } from 'react-redux'
import cx from 'classnames'
import pathModule from 'path'
import SplitPane from 'react-split-pane'
import FaFolder from 'react-icons/fa/folder'
import IconClose from 'react-icons/md/close'
import IconEdit from 'react-icons/md/mode-edit'

import { openModal } from 'reducers/modals'

import { readDir, sortFiles, fsRename } from 'helpers/fs'
import { setPreview } from 'actions/preview'
import { updateSettings } from 'actions/settings'

import FileEditor from 'components/FileEditor'
import FilePreview from './FilePreview'

import './styles.scss'

function renameFile(path, oldName, newName, files) {
  if (oldName === newName) {
    return
  }
  const filesWithoutOld = files.filter(f => f.name !== oldName)
  const fileExists = filesWithoutOld.some(f => f.name === newName)
  if (fileExists) {
    throw new Error('File already exists')
  }
  const oldFullName = pathModule.join(path, oldName)
  const newFullName = pathModule.join(path, newName)
  return fsRename(oldFullName, newFullName)
}

@connect(
  state => ({
    previewSize: state.settings.get('previewSize'),
  }),
  {
    setPreview,
    openModal,
    updateSettings,
  },
  null,
  { withRef: true },
)
class FilesList extends Component {
  state = {
    isLoading: true,
    isAdding: false,
    files: [],
    preview: null,
    editingFile: null,
    isDragging: false,
    renamedFile: null,
    newName: '',
  }

  componentWillMount() {
    this._hasFocused = false
  }

  componentDidMount() {
    this.refresh()
    ipcRenderer.on('browser-window-focus', this.refresh)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.path !== this.props.path) {
      this.refresh()
    }
    if (!prevState.isAdding && this.state.isAdding) {
      this._inputName.focus()
    }
    if (this.state.files.length > prevState.files.length && this._lastCreated) {
      this._refs[this._lastCreated].focus()
    }
    if (!prevState.renamedFile && this.state.renamedFile) {
      this._renameInput.select()
    }
  }

  componentWillUnmount() {
    this._unmounted = true
    ipcRenderer.removeListener('browser-window-focus', this.refresh)
  }

  handleSubmit = e => {
    e.preventDefault()
    const { path, onAddFile, onActiveFileChange } = this.props
    let name = this._inputName.value
    if (!name) {
      return
    }
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

  handleClickDirectFactory = (items, i) => () => {
    const sub = items.slice(0, i + 1)
    const relativePath = sub.join(pathModule.sep)
    const path = pathModule.join(this.props.rootPath, relativePath)
    this.props.onPathChange(path)
  }

  handleRemoveFileFactory = f => e => {
    if (e) {
      e.preventDefault()
    }
    const p = pathModule.join(this.props.path, f.name)
    this.props.onRemoveFile(p)
  }

  handleNavigateUp = () => {
    this.props.onPathChange(pathModule.dirname(this.props.path))
  }

  handlePreviewPanelStopDrag = size => {
    this.setCurrentSize(size)
    this.stopDrag()
  }

  handleChangeNewName = e => {
    this.setState({ newName: e.target.value })
  }

  handleCancelRename = () =>
    this.setState({
      renamedFile: null,
      newName: '',
    })

  handleRenameInputKeyDown = async e => {
    switch (e.which) { // eslint-disable-line
      case 27:
        this.handleCancelRename()
        break
      case 13:
        try {
          const { path } = this.props
          const { newName, renamedFile, files } = this.state
          await renameFile(path, renamedFile.name, newName, files)
          const newFile = { name: newName, isFolder: false }
          const newFiles = files.map(f => {
            if (f === renamedFile) {
              return newFile
            }
            return f
          })
          sortFiles(newFiles)
          this.setState({ files: newFiles })
          this.props.onActiveFileChange(newFile)
          this.handleCancelRename()
        } catch (e) {} // eslint-disable-line
        break
    }
  }

  setCurrentSize = size => {
    this.props.updateSettings(settings => {
      return settings.setIn(['previewSize', 'current'], size)
    })
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
      if (this._unmounted) {
        return
      }
      sortFiles(files)
      this.setState({
        isLoading: false,
        files,
      })
      window.requestIdleCallback(() => {
        if (files.length && !this._hasFocused) {
          const indexOfIndexFile = files.findIndex(f => f.name === 'index.mjml')
          const indexOfFirstMJMLFile = files.findIndex(f => f.name.endsWith('.mjml'))
          const activeIndex =
            indexOfIndexFile > -1
              ? indexOfIndexFile
              : indexOfFirstMJMLFile > -1 ? indexOfFirstMJMLFile : 0
          this.props.onActiveFileChange(files[activeIndex])
          this._hasFocused = true
        }
      })
    })
  }

  startDrag = () => this.setState({ isDragging: true })
  stopDrag = () => {
    this.setState({ isDragging: false })
    if (!this._editor) {
      return
    }
    this._editor.refresh()
    this._editor.focus()
  }

  toggleAdding = e => {
    if (e) {
      e.preventDefault()
    }
    this.setState(s => ({ isAdding: !s.isAdding }))
  }

  cancelAdd = e => {
    if (e) {
      e.preventDefault()
    }
    this.setState(
      s => ({ isAdding: !s.isAdding }),
      () => {
        this._addBtn.focus()
      },
    )
  }

  render() {
    const { files, isDragging, renamedFile, newName } = this.state

    const { onRef, onEditorRef, activeFile, path, rootPath, openModal, previewSize } = this.props

    onRef(this)

    const setRef = this.refsFactory()

    const rootPathItems = rootPath.split(pathModule.sep)
    const pathItems = path.split(pathModule.sep).slice(rootPathItems.length)

    const fullActiveFile = pathModule.join(path, (activeFile && activeFile.name) || '')

    return (
      <div className="fg-1 d-f fd-c">
        <div className="rel fg-1">
          <SplitPane
            split="vertical"
            defaultSize={180}
            minSize={2}
            maxSize={250}
            onDragStarted={this.startDrag}
            onDragFinished={this.stopDrag}
          >
            <div className="sticky o-y-a bg-dark">
              <div className="rel FilesList--list anim-enter-fade-left">
                {!!pathItems.length &&
                  <button
                    className="FilesList--file d-f ai-c"
                    tabIndex={0}
                    onClick={this.handleNavigateUp}
                  >
                    <div className="fg-1 FilesList--item-name-container">
                      <div className="FilesList--item-name">
                        {'..'}
                      </div>
                    </div>
                  </button>}
                {files.map(
                  f =>
                    renamedFile === f
                      ? <div key={f.name} className="FilesList--file renaming active">
                          <input
                            ref={n => (this._renameInput = n)}
                            autoFocus
                            type="text"
                            value={newName}
                            onKeyDown={this.handleRenameInputKeyDown}
                            onChange={this.handleChangeNewName}
                            onBlur={this.handleCancelRename}
                          />
                        </div>
                      : <button
                          ref={setRef(f.name)}
                          key={f.name}
                          className={cx('FilesList--file d-f ai-c', {
                            active: activeFile && activeFile.name === f.name,
                          })}
                          tabIndex={0}
                          onClick={this.handleClickFactory(f)}
                        >
                          {f.isFolder &&
                            <div className="fs-0 pr-10">
                              <FaFolder />
                            </div>}
                          <div className="fg-1 FilesList--item-name-container">
                            <div className="FilesList--item-name">
                              {f.name}
                            </div>
                          </div>
                          <div className="FilesList--item-actions">
                            <div
                              tabIndex={0}
                              onClick={() =>
                                this.setState({
                                  renamedFile: f,
                                  newName: f.name,
                                })}
                              className="action action-rename"
                            >
                              <IconEdit />
                            </div>
                            <div
                              tabIndex={0}
                              onClick={() => openModal('removeFile', f)}
                              className="action action-remove"
                            >
                              <IconClose />
                            </div>
                          </div>
                        </button>,
                )}
              </div>
            </div>
            <SplitPane
              ref={n => (this._previewSplitPane = n)}
              split="vertical"
              size={previewSize.get('current')}
              maxSize={previewSize.get('desktop')}
              minSize={previewSize.get('mobile')}
              primary="second"
              onDragStarted={this.startDrag}
              onDragFinished={this.handlePreviewPanelStopDrag}
            >
              <div className="d-f fd-c sticky anim-enter-fade">
                {activeFile &&
                  activeFile.name.endsWith('.mjml') &&
                  <FileEditor
                    onRef={n => {
                      this._editor = n
                      onEditorRef(n)
                    }}
                    fileName={fullActiveFile}
                    disablePointer={isDragging}
                  />}
              </div>
              <div className="sticky fs-0 ml-5 rel FilesList--preview-container">
                <FilePreview
                  disablePointer={isDragging}
                  onSetSize={this.setCurrentSize}
                  iframeBase={path}
                />
              </div>
            </SplitPane>
          </SplitPane>
        </div>
      </div>
    )
  }
}

export default FilesList
