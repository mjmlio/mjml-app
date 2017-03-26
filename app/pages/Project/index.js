import React, { Component } from 'react'
import rimraf from 'rimraf'
import { connect } from 'react-redux'
import FaCog from 'react-icons/fa/cog'
import FaUnlink from 'react-icons/fa/chain-broken'
import FaFolderOpen from 'react-icons/fa/arrow-up'
import FaZip from 'react-icons/fa/file-archive-o'
import fs from 'fs'
import { replace } from 'react-router-redux'
import { shell } from 'electron'

import defaultMJML from 'data/defaultMJML'

import { fileDialog } from 'helpers/fs'

import { removeProject } from 'actions/projects'

import Button from 'components/Button'
import FilesList from 'components/FilesList'
import Modal from 'components/Modal'

@connect(null, (dispatch, props) => ({
  handleClickUnwatch: () => {
    const { path } = props.location.query
    dispatch(removeProject(path))
    dispatch(replace('/'))
  },
}))
class FolderPage extends Component {

  state = {
    path: this.props.location.query.path,
    isAddModalOpened: false,
    isSettingsModalOpened: false,
  }

  componentDidUpdate (prevProps, prevState) {
    if (!prevState.isSettingsModalOpened && this.state.isSettingsModalOpened) {
      this._btnUnwatch.focus()
    }
    if (prevState.isSettingsModalOpened && !this.state.isSettingsModalOpened) {
      this._btnSettings.focus()
    }
  }

  handlePathChange = path => this.setState({ path })
  handleFileDoubleClick = p => {
    if (p.endsWith('.mjml')) {
      // console.log(`opening ${p}`)
    }
  }

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
      this._filelist.getWrappedInstance().refresh()
    })
  }

  handleRemoveFile = fileName => {
    rimraf(fileName, err => {
      if (err) { return }
      this._filelist.getWrappedInstance().refresh()
      this.setState({ activeFile: null })
    })
  }

  handleOpenInBrowser = () => {
    shell.openItem(this.state.path)
  }

  handleActiveFileChange = activeFile => this.setState({ activeFile })

  openSettingsModal = () => this.setState({ isSettingsModalOpened: true })
  closeSettingsModal = () => this.setState({ isSettingsModalOpened: false })

  render () {

    const {
      path,
      activeFile,
      isSettingsModalOpened,
    } = this.state

    const {
      handleClickUnwatch,
    } = this.props

    const rootPath = this.props.location.query.path

    return (
      <div className='fg-1 d-f fd-c p-10'>

        <FilesList
          ref={n => this._filelist = n}
          withPreview
          withHome
          rootPath={rootPath}
          path={path}
          activeFile={activeFile}
          onActiveFileChange={this.handleActiveFileChange}
          onPathChange={this.handlePathChange}
          onFileDoubleClick={this.handleFileDoubleClick}
          onAddClick={this.openAddModal}
          onAddFile={this.handleAddFile}
          onRemoveFile={this.handleRemoveFile}
          focusHome
        >
          <div className='flow-h-5'>
            <Button
              transparent
              onClick={this.handleOpenInBrowser}
              ref={n => this._btnSettings = n}
            >
              <FaZip style={{ marginRight: 5 }} />
              {'Export'}
            </Button>
            <Button
              transparent
              onClick={this.handleOpenInBrowser}
              ref={n => this._btnSettings = n}
            >
              <FaFolderOpen style={{ marginRight: 5 }} />
              {'Open'}
            </Button>
            <Button ghost onClick={this.openSettingsModal} ref={n => this._btnSettings = n}>
              <FaCog style={{ marginRight: 5 }} />
              {'Settings'}
            </Button>
          </div>
        </FilesList>

        <Modal
          isOpened={isSettingsModalOpened}
          onClose={this.closeSettingsModal}
        >
          <h2>{'Project settings'}</h2>
          <Button ghost onClick={handleClickUnwatch} ref={n => this._btnUnwatch = n}>
            <FaUnlink style={{ marginRight: 5 }} />
            {'Stop watching folder'}
          </Button>
        </Modal>

      </div>
    )
  }

}

export default FolderPage
