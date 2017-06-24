import React, { Component } from 'react'
import { Collapse } from 'react-collapse'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { fromJS } from 'immutable'
import IconFolder from 'react-icons/md/folder'
import IconFile from 'react-icons/md/insert-drive-file'
import IconFolderClosed from 'react-icons/md/keyboard-arrow-right'
import IconFolderOpen from 'react-icons/md/keyboard-arrow-down'
import IconMJML from 'mailjet-icons/react/mjml'
import IconImage from 'react-icons/md/photo'

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

  static propTypes = {
    nesting: PropTypes.number,
    focusedFilePath: PropTypes.string,
  }

  static defaultProps = {
    nesting: 0,
  }

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
      focusedFilePath,
      onFileClick,
      nesting,
    } = this.props

    const {
      files,
    } = this.state

    return (
      <div>
        {files.map(file => (
          <FileItem
            focusedFilePath={focusedFilePath}
            nesting={nesting}
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

  componentWillReceiveProps (nextProps) {

    const {
      file,
      focusedFilePath,
    } = nextProps

    const {
      isOpened,
    } = this.state

    const isFolder = file.get('isFolder')
    const filePath = file.get('path')

    // open folder when focusing file in nested folder
    if (focusedFilePath && isFolder && !isOpened && focusedFilePath.startsWith(filePath)) {
      this.setState({ isOpened: true })
    }
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
      nesting,
      focusedFilePath,
    } = this.props

    const {
      isOpened,
    } = this.state

    const filePath = file.get('path')
    const fileName = file.get('name')
    const isFolder = file.get('isFolder')
    const isImage = filePath.endsWith('.jpg')
      || filePath.endsWith('.png')
      || filePath.endsWith('.gif')

    return (
      <div>

        <Tabbable
          className={cx('d-f ai-c p-5 cu-d FileTree-item-label', {
            isActive: filePath === focusedFilePath,
          })}
          style={{
            paddingLeft: nesting * 20,
          }}
          onClick={isFolder ? this.handleToggle : undefined}
          onDoubleClick={isFolder ? undefined : this.handleSelect}
        >
          {isFolder && (
            <div className='z fs-0' style={{ width: 20 }}>
              {isOpened ? <IconFolderOpen /> : <IconFolderClosed />}
            </div>
          )}
          <div className='z fs-0' style={{ width: 20, marginRight: 2 }}>
            {isFolder && <IconFolder />}
            {!isFolder && (
              filePath.endsWith('.mjml') ? (
                <IconMJML />
              ) : isImage ? (
                <IconImage />
              ) : (
                <IconFile />
              )
            )}
          </div>
          <div className='fg-1 ellipsis'>
            {fileName}
          </div>
        </Tabbable>

        {isFolder && (
          <Collapse isOpened={isOpened} springConfig={{ stiffness: 300, damping: 30 }}>
            <FileTree
              focusedFilePath={focusedFilePath}
              nesting={nesting + 1}
              base={filePath}
              onFileClick={onFileClick}
            />
          </Collapse>
        )}

      </div>
    )
  }

}

export default function FileExplorer (props) {

  const {
    base,
    onFileClick,
    focusedFilePath,
  } = props

  return (
    <div className='FileExplorer sticky'>
      <FileTree
        base={base}
        onFileClick={onFileClick}
        focusedFilePath={focusedFilePath}
      />
    </div>
  )
}
