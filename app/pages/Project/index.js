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

import defaultMJML from 'data/defaultMJML'

import { openModal } from 'reducers/modals'
import { addAlert } from 'reducers/alerts'
import { setPreview } from 'actions/preview'
import { openTab } from 'reducers/tabs'

import { fileDialog, saveDialog, fsWriteFile } from 'helpers/fs'

import FileTabs from 'components/FileTabs'
import Button from 'components/Button'
import ButtonDropdown from 'components/Button/ButtonDropdown'
import FileExplorer from 'components/FileExplorer'
import NotifBtn from 'components/Notifs/NotifBtn'

import BackButton from './BackButton'
import SendModal from './SendModal'
import AddFileModal from './AddFileModal'
import RemoveFileModal from './RemoveFileModal'

import takeScreenshot from 'helpers/takeScreenshot'

import './style.scss'

@connect(state => ({
  preview: state.preview,
  previewSize: state.settings.get('previewSize'),
  beautifyOutput: state.settings.getIn(['mjml', 'beautify']),
  tabs: state.tabs,
}), {
  openModal,
  addAlert,
  setPreview,
  openTab,
})
class ProjectPage extends Component {

  state = {
    path: this.props.location.query.path,
    activeFile: null,
  }

  componentDidMount () {
    this._page.focus()
  }

  componentWillUnmount () {
    this.props.setPreview(null)
  }

  handleBeautify = () => this._editor.beautify()

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
    if (process.platform === 'darwin') {
      shell.showItemInFolder(this.state.path)
    } else {
      shell.openItem(this.state.path)
    }
  }

  handleActiveFileChange = activeFile => this.setState({ activeFile })

  handleCopyHTML = () => {
    const htmlContent = this.getHTMLOutput()
    clipboard.writeText(htmlContent)
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
      addAlert,
    } = this.props

    const htmlContent = this.getHTMLOutput()

    await fsWriteFile(p, htmlContent)
    addAlert('Successfully exported HTML', 'success')
    this._filelist.refresh()
  }

  handleScreenshot = async () => {
    const {
      preview,
      previewSize,
      addAlert,
      location,
    } = this.props

    const filename = pathModule.basename(this.state.activeFile.name, '.mjml')

    const [mobileWidth, desktopWidth] = [previewSize.get('mobile'), previewSize.get('desktop')]

    const [mobileScreenshot, desktopScreenshot] = await Promise.all([
      takeScreenshot(preview.content, mobileWidth),
      takeScreenshot(preview.content, desktopWidth),
    ])

    await Promise.all([
      fsWriteFile(pathModule.join(location.query.path, `${filename}-mobile.png`), mobileScreenshot),
      fsWriteFile(pathModule.join(location.query.path, `${filename}-desktop.png`), desktopScreenshot),
    ])

    addAlert('Successfully saved mobile and desktop screenshots', 'success')
    this._filelist.refresh()
  }

  openSettingsModal = () => this.props.openModal('settings')
  openSendModal = () => this.props.openModal('send')
  openAddFileModal = () => this.props.openModal('addFile')

  getHTMLOutput () {
    const { preview, beautifyOutput } = this.props
    return beautifyOutput
      ? beautifyJS.html(preview.content)
      : preview.content
  }

  render () {

    const {
      preview,
      openTab,
      tabs,
    } = this.props

    const {
      path,
      activeFile,
    } = this.state

    const rootPath = this.props.location.query.path
    const projectName = pathModule.basename(rootPath)
    const isMJMLFile = activeFile && activeFile.name.endsWith('.mjml')

    return (
      <div className='fg-1 d-f fd-c o-n' tabIndex={0} ref={n => this._page = n}>

        {/*
        <div className='d-f p-10 r' style={{ zIndex: 2 }}>
          <div className='fg-1 flow-h-10'>
            <BackButton projectName={projectName} />
            <Button
              ghost
              onClick={this.openAddFileModal}
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
            {preview && preview.type === 'html' && [
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
        </div>
        */}

        <div className='fg-1 d-f' style={{ zIndex: 1 }}>

          <div className='r fs-0 Project-FileExplorer'>
            <FileExplorer base={rootPath} onFileClick={p => openTab(p)} />
          </div>
          <div className='fg-1'>
            <FileTabs />
          </div>

        </div>

        <SendModal />
        <AddFileModal rootPath={rootPath} onAdd={this.handleAddFile} />
        <RemoveFileModal rootPath={rootPath} onRemove={this.handleRemoveFile} />

      </div>
    )
  }

}

export default ProjectPage
