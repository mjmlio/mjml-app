import React, { Component } from 'react'
import pathModule from 'path'
import rimraf from 'rimraf'
import { connect } from 'react-redux'
import FaCog from 'react-icons/fa/cog'
import FaFolderOpen from 'react-icons/fa/arrow-up'
import IconCopy from 'react-icons/md/content-copy'
import IconCode from 'react-icons/md/code'
import IconCamera from 'react-icons/md/camera-alt'
import IconEmail from 'react-icons/md/email'
import IconAdd from 'react-icons/md/note-add'
import IconBeautify from 'react-icons/md/autorenew'
import fs from 'fs'
import { shell, clipboard } from 'electron'
import beautifyJS from 'js-beautify'
import SplitPane from 'react-split-pane'

import defaultMJML from 'data/defaultMJML'

import { openModal } from 'reducers/modals'
import { addAlert } from 'reducers/alerts'
import { setPreview } from 'actions/preview'
import { openTab } from 'reducers/tabs'

import { fileDialog, saveDialog, fsWriteFile } from 'helpers/fs'

import FileTabs from 'components/FileTabs'
import TabContent from 'components/TabContent'
import Button from 'components/Button'
import ButtonDropdown from 'components/Button/ButtonDropdown'
import FileExplorer from 'components/FileExplorer'
import NotifBtn from 'components/Notifs/NotifBtn'

import BackButton from './BackButton'
import SendModal from './SendModal'
import AddFileModal from './AddFileModal'
import RemoveFileModal from './RemoveFileModal'

@connect(null, {
  openModal,
})
class ProjectToolbar extends Component {

  handleAddFile = (fileName) => {
    fs.writeFile(fileName, defaultMJML, (err) => {
      if (err) { return }
      this.props.onFilesRefresh()
    })
  }

  render () {
    const {
      projectName,
      projectPath,
      activeFile,
      openModal,
    } = this.props
    const isMJMLFile = activeFile && activeFile.name.endsWith('.mjml')
    return (
      <div className='d-f p-10 r' style={{ zIndex: 2 }}>
        <div className='fg-1 flow-h-10'>
          <BackButton projectName={projectName} />
          <Button
            ghost
            onClick={() => openModal('addFile')}
          >
            <IconAdd className='mr-5' />
            {'New file'}
          </Button>
        </div>
        <div className='d-f flow-h-10'>
          {isMJMLFile && [
            <Button
              key='beautify'
              transparent
              onClick={this.handleBeautify}
            >
              <IconBeautify style={{ marginRight: 5 }} />
              {'Beautify'}
            </Button>,
          ]}
          <Button
            transparent
            onClick={this.handleOpenInBrowser}
          >
            <FaFolderOpen style={{ marginRight: 5 }} />
            {'Open'}
          </Button>
          {false && preview && preview.type === 'html' && [
            <Button
              key={'send'}
              transparent
              onClick={this.openSendModal}
            >
              <IconEmail style={{ marginRight: 5 }} />
              {'Send'}
            </Button>,
            <ButtonDropdown
              ghost
              key={'export'}
              dropdownWidth={300}
              actions={[
                {
                  icon: <IconCopy />,
                  label: 'Copy HTML',
                  desc: 'Copy the result HTML to clipboard',
                  onClick: this.handleCopyHTML,
                },
                {
                  icon: <IconCode />,
                  label: 'Export to HTML file',
                  desc: 'Save the result HTML file to disk',
                  onClick: this.handleExportToHTML,
                },
                {
                  icon: <IconCamera />,
                  label: 'Screenshot',
                  desc: 'Save a screeshot of mobile & desktop result',
                  onClick: this.handleScreenshot,
                },
              ]}
            />,
          ]}
        </div>
        <Button
          className='ml-10'
          ghost
          onClick={this.openSettingsModal}
          ref={n => this._btnSettings = n}
        >
          <FaCog />
        </Button>
        <NotifBtn />

        <AddFileModal rootPath={projectPath} onAdd={this.handleAddFile} />

      </div>
    )
  }

}

export default ProjectToolbar
