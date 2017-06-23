import React, { Component } from 'react'
import cx from 'classnames'
import { fromJS } from 'immutable'
import IconFolder from 'react-icons/md/folder'
import IconFile from 'react-icons/md/insert-drive-file'
import IconFolderClosed from 'react-icons/md/keyboard-arrow-right'
import IconFolderOpen from 'react-icons/md/keyboard-arrow-down'

import Tabbable from 'components/Tabbable'

import {
  readDir,
  sortFiles,
} from 'helpers/fs'

import './style.scss'

async function fetchDir (path) {
  const files = await readDir(path)
  sortFiles(files)
  return fromJS(files)
}

class FileTree extends Component {

  state = {
    files: fromJS([]),
  }

  componentDidMount () {
    window.requestIdleCallback(this.refreshFiles)
  }

  refreshFiles = async () => {
    const { base } = this.props
    const files = await fetchDir(base)
    this.safeSetState({ files: fromJS(files) })
  }

  safeSetState = (...args) => this.setState(...args)

  render () {

    const {
      onFileClick,
    } = this.props

    const {
      files,
    } = this.state

    return (
      <div>
        {files.map(file => (
          <FileItem
            key={file.get('path')}
            file={file}
            onFileClick={onFileClick}
          />
        ))}
      </div>
    )
  }

}

class FileItem extends Component {

  state = {
    isOpened: false,
  }

  handleToggle = () => {
    this.setState({ isOpened: !this.state.isOpened })
  }

  handleSelect = () => {
    const { file, onFileClick } = this.props
    onFileClick(file.get('path'))
  }

  render () {

    const {
      file,
      onFileClick,
    } = this.props

    const {
      isOpened,
    } = this.state

    const filePath = file.get('path')
    const fileName = file.get('name')
    const isFolder = file.get('isFolder')
    return (
      <div key={filePath}>

        <Tabbable
          className={cx('d-f ai-c p-5 cu-d FileTree-item-label', {
            isActive: isOpened,
          })}
          onClick={isFolder ? this.handleToggle : undefined}
          onDoubleClick={isFolder ? undefined : this.handleSelect}
        >
          {isFolder && (isOpened ? <IconFolderOpen /> : <IconFolderClosed />)}
          <div className='z fs-0' style={{ width: 20, marginRight: 2 }}>
            {isFolder && <IconFolder />}
            {!isFolder && <IconFile />}
          </div>
          <div className='fg-1 ellipsis'>
            {fileName}
          </div>
        </Tabbable>

        {isOpened && (
          <div style={{ marginLeft: 30 }}>
            <FileTree
              base={filePath}
              onFileClick={onFileClick}
            />
          </div>
        )}

      </div>
    )
  }

}

export default function FileExplorer (props) {
  const {
    base,
    onFileClick,
    ...p
  } = props
  return (
    <div className='FileExplorer sticky' {...p}>
      <FileTree base={base} onFileClick={onFileClick} />
    </div>
  )
}
