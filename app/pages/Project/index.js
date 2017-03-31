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

import { openModal } from 'reducers/modals'

import { fileDialog } from 'helpers/fs'

import Button from 'components/Button'
import FilesList from 'components/FilesList'

import SettingsModal from './SettingsModal'

@connect(null, {
  openModal,
})
class ProjectPage extends Component {

  state = {
    path: this.props.location.query.path,
  }

  componentDidMount () {
    this._page.focus()
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

  openSettingsModal = () => this.props.openModal('settings')

  render () {

    const {
      path,
      activeFile,
    } = this.state

    const rootPath = this.props.location.query.path

    return (
      <div className='fg-1 d-f fd-c o-n' tabIndex={0} ref={n => this._page = n}>

        <div className='d-f flow-h-5 p-10'>
          <div className='fg-1'>
            <Button
              className='c-d'
              transparent
              link
              to='/'
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
            onAddClick={this.openAddModal}
            onAddFile={this.handleAddFile}
            onRemoveFile={this.handleRemoveFile}
            focusHome
          />
        </div>

        <SettingsModal />

      </div>
    )
  }

}

export default ProjectPage
