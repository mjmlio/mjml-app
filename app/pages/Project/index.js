import React, { Component } from 'react'
import rimraf from 'rimraf'
import { connect } from 'react-redux'
import FaCog from 'react-icons/fa/cog'
import FaFolderOpen from 'react-icons/fa/arrow-up'
import FaHome from 'react-icons/md/arrow-back'
import IconEmail from 'react-icons/md/email'
import fs from 'fs'
import { shell } from 'electron'

import defaultMJML from 'data/defaultMJML'

import { fileDialog } from 'helpers/fs'

import Button from 'components/Button'
import FilesList from 'components/FilesList'
import Modal from 'components/Modal'

@connect()
class FolderPage extends Component {

  state = {
    path: this.props.location.query.path,
    isAddModalOpened: false,
    isSettingsModalOpened: false,
  }

  componentDidMount () {
    this._btnHome.focus()
    console.log(`focused`)
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.isSettingsModalOpened && !this.state.isSettingsModalOpened) {
      console.log(`hehre`)
      this._btnSettings.focus()
    }
  }

  handlePathChange = path => this.setState({ path, activeFile: null })
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

    const rootPath = this.props.location.query.path

    return (
      <div className='fg-1 d-f fd-c'>

        <div className='d-f flow-h-5 p-10'>
          <div className='fg-1'>
            <Button
              className='c-d'
              transparent
              link
              to='/'
              ref={n => this._btnHome = n}
            >
              <FaHome className='mr-5' />
              {'Back to projects'}
            </Button>
          </div>
          <div className='d-f'>
            <Button
              transparent
              onClick={this.handleEmail}
            >
              <IconEmail style={{ marginRight: 5 }} />
              {'Send'}
            </Button>
            <Button
              transparent
              onClick={this.handleOpenInBrowser}
              ref={n => this._btnSettings = n}
            >
              <FaFolderOpen style={{ marginRight: 5 }} />
              {'Open'}
            </Button>
          </div>
          <Button ghost onClick={this.openSettingsModal} ref={n => this._btnSettings = n}>
            <FaCog style={{ marginRight: 5 }} />
            {'Settings'}
          </Button>
        </div>

        <div className='fg-1 d-f fd-c mr-10 mb-10'>
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
          />
        </div>

        <Modal
          isOpened={isSettingsModalOpened}
          onClose={this.closeSettingsModal}
        >
          <div className='Modal--label'>
            {'Settings'}
          </div>
          <div className='d-f ai-fs'>
            <div className='fg-1 mr-10'>
              {'content'}
            </div>
            <div style={{ width: 150 }}>
              <div className='version-box t-small flow-v-10'>

                <div className='d-f ai-c'>
                  <div className='fg-1'>
                    {'MJML App'}
                  </div>
                  <b className='c-white'>
                    {__MJML_APP_VERSION__}
                  </b>
                </div>

                <div className='d-f ai-c'>
                  <div className='fg-1'>
                    {'MJML'}
                  </div>
                  <b className='c-white'>
                    {__MJML_VERSION__}
                  </b>
                </div>

              </div>
            </div>
          </div>
        </Modal>

      </div>
    )
  }

}

export default FolderPage
