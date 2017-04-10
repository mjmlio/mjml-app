import React, { Component } from 'react'
import rimraf from 'rimraf'
import { connect } from 'react-redux'
import FaCog from 'react-icons/fa/cog'
import FaFolderOpen from 'react-icons/fa/arrow-up'
import FaHome from 'react-icons/md/arrow-back'
import IconEmail from 'react-icons/md/email'
import IconCode from 'react-icons/md/code'
import IconCopy from 'react-icons/md/content-copy'
import IconAdd from 'react-icons/md/note-add'
import fs from 'fs'
import { shell, clipboard } from 'electron'

import defaultMJML from 'data/defaultMJML'

import { openModal } from 'reducers/modals'
import { addAlert } from 'reducers/alerts'
import { setPreview } from 'actions/preview'

import { fileDialog, saveDialog, fsWriteFile } from 'helpers/fs'

import Button from 'components/Button'
import FilesList from 'components/FilesList'

import SendModal from './SendModal'
import AddFileModal from './AddFileModal'
import RemoveFileModal from './RemoveFileModal'

@connect(state => ({
  preview: state.preview,
}), {
  openModal,
  addAlert,
  setPreview,
})
class ProjectPage extends Component {

  state = {
    path: this.props.location.query.path,
  }

  componentDidMount () {
    this._page.focus()
  }

  componentWillUnmount () {
    this.props.setPreview(null)
  }

  handlePathChange = path => this.setState({ path, activeFile: null })

  handleClickImport = () => {
    const p = fileDialog({
      defaultPath: this.props.location.query.path,
      properties: [
        'openFile',
      ],
      filters: [
        { name: 'All Files', extensions: ['mjml'] },
      ],
    })

    if (!p) { return }

    fs.readFile(p, { encoding: 'utf8' }, (err, res) => {
      if (err) { return }
      this._content = res
    })
  }

  handleAddFile = (fileName) => {
    fs.writeFile(fileName, defaultMJML, (err) => {
      if (err) { return }
      this._filelist.refresh()
    })
  }

  handleRemoveFile = fileName => {
    rimraf(fileName, err => {
      if (err) { return }
      this._filelist.refresh()
      this.setState({ activeFile: null })
    })
  }

  handleOpenInBrowser = () => {
    shell.openItem(this.state.path)
  }

  handleActiveFileChange = activeFile => this.setState({ activeFile })

  handleCopyHTML = () => {
    clipboard.writeText(this.props.preview.content)
    this.props.addAlert('Copied!', 'success')
  }

  handleExportToHTML = async () => {
    const p = saveDialog({
      title: 'Export to HTML file',
      defaultPath: this.props.location.query.path,
      filters: [
        { name: 'All Files', extensions: ['html'] },
      ],
    })
    if (!p) { return }

    const {
      preview,
      addAlert,
    } = this.props

    await fsWriteFile(p, preview.content)
    addAlert('Successfully exported HTML', 'success')
    this._filelist.refresh()
  }

  openSettingsModal = () => this.props.openModal('settings')
  openSendModal = () => this.props.openModal('send')
  openAddFileModal = () => this.props.openModal('addFile')

  render () {

    const {
      preview,
    } = this.props

    const {
      path,
      activeFile,
    } = this.state

    const rootPath = this.props.location.query.path

    return (
      <div className='fg-1 d-f fd-c o-n' tabIndex={0} ref={n => this._page = n}>

        <div className='d-f p-10'>
          <div className='fg-1 flow-h-10'>
            <Button
              className='c-d'
              transparent
              link
              to='/'
            >
              <FaHome className='mr-5' />
              {'Back to projects'}
            </Button>
            <Button
              ghost
              onClick={this.openAddFileModal}
            >
              <IconAdd className='mr-5' />
              {'New file'}
            </Button>
          </div>
          <div className='d-f flow-h-10'>
            {preview && preview.type === 'html' && [
              <Button
                key={'copy'}
                transparent
                onClick={this.handleCopyHTML}
              >
                <IconCopy style={{ marginRight: 5 }} />
                {'Copy HTML'}
              </Button>,
              <Button
                key={'export'}
                transparent
                onClick={this.handleExportToHTML}
              >
                <IconCode style={{ marginRight: 5 }} />
                {'Export HTML'}
              </Button>,
              <Button
                key={'send'}
                transparent
                onClick={this.openSendModal}
              >
                <IconEmail style={{ marginRight: 5 }} />
                {'Send'}
              </Button>,
            ]}
            <Button
              transparent
              onClick={this.handleOpenInBrowser}
            >
              <FaFolderOpen style={{ marginRight: 5 }} />
              {'Open'}
            </Button>
          </div>
          <Button
            className='ml-10'
            ghost
            onClick={this.openSettingsModal}
            ref={n => this._btnSettings = n}
          >
            <FaCog />
          </Button>
        </div>

        <div className='fg-1 d-f fd-c'>
          <FilesList
            onRef={n => this._filelist = n}
            withPreview
            withHome
            rootPath={rootPath}
            path={path}
            activeFile={activeFile}
            onActiveFileChange={this.handleActiveFileChange}
            onPathChange={this.handlePathChange}
            onAddClick={this.openAddModal}
            onAddFile={this.handleAddFile}
            onRemoveFile={this.handleRemoveFile}
            focusHome
          />
        </div>

        <SendModal />
        <AddFileModal
          rootPath={rootPath}
          onAdd={this.handleAddFile}
        />
        <RemoveFileModal
          rootPath={rootPath}
          onRemove={this.handleRemoveFile}
        />

      </div>
    )
  }

}

export default ProjectPage
