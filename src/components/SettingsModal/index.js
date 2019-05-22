import React, { Component } from 'react'
import debounce from 'lodash/debounce'
import { connect } from 'react-redux'
import IconMobile from 'react-icons/md/phone-android'
import IconDesktop from 'react-icons/md/desktop-windows'
import IconClose from 'react-icons/md/close'
import IconMJMLEngine from 'react-icons/md/settings-applications'
import IconEditor from 'react-icons/md/format-align-left'
import IconPreview from 'react-icons/md/important-devices'
import IconCode from 'react-icons/md/code'

import { isModalOpened, closeModal } from 'reducers/modals'
import { updateSettings } from 'actions/settings'

import Modal from 'components/Modal'
import Button from 'components/Button'
import CheckBox from 'components/CheckBox'
import TabsVertical, { TabItem } from 'components/TabsVertical'
import SnippetForm from 'components/SnippetForm'
import SnippetsList from 'components/SnippetsList'

import MJMLEngine from 'components/MJMLEngine'
import MjmlConfigPath from 'components/MjmlConfigPath'

import './style.scss'

@connect(
  state => ({
    isOpened: isModalOpened(state, 'settings'),
    mobileSize: state.settings.getIn(['previewSize', 'mobile']),
    desktopSize: state.settings.getIn(['previewSize', 'desktop']),
    settings: state.settings,
  }),
  {
    closeModal,
    updateSettings,
  },
)
class SettingsModal extends Component {
  state = {
    sizes: {
      mobile: this.props.mobileSize,
      desktop: this.props.desktopSize,
    },
  }

  handleClose = () => this.props.closeModal('settings')

  handleChangeSize = (key, val) => {
    this.setState(state => ({
      ...state,
      sizes: {
        ...state.sizes,
        [key]: Number(val),
      },
    }))
    this.debounceChangeSizes()
  }

  debounceChangeSizes = debounce(() => {
    const { sizes } = this.state
    this.props.updateSettings(settings => {
      return settings
        .setIn(['previewSize', 'mobile'], sizes.mobile)
        .setIn(['previewSize', 'desktop'], sizes.desktop)
    })
  }, 250)

  changeEditorSetting = key => val => {
    this.props.updateSettings(settings => settings.setIn(['editor', key], val))
  }

  changeMJMLSetting = key => val => {
    this.props.updateSettings(settings => {
      settings = settings.setIn(['mjml', key], val)
      if (key === 'minify' && val === true) {
        settings = settings.setIn(['mjml', 'beautify'], false)
      }
      if (key === 'beautify' && val === true) {
        settings = settings.setIn(['mjml', 'minify'], false)
      }
      return settings
    })
  }

  render() {
    const { isOpened, settings } = this.props

    const { sizes } = this.state

    const editorWrapLines = settings.getIn(['editor', 'wrapLines'], true)
    const editorHightlightTag = settings.getIn(['editor', 'highlightTag'], false)
    const autoFold = settings.getIn(['editor', 'autoFold'], false)
    const foldLevel = settings.getIn(['editor', 'foldLevel'], 1)
    const editorLightTheme = settings.getIn(['editor', 'lightTheme'], false)
    const minifyOutput = settings.getIn(['mjml', 'minify'], false)
    const beautifyOutput = settings.getIn(['mjml', 'beautify'], false)
    const editorUseTab = settings.getIn(['editor', 'useTab'], false)
    const editorTabSize = settings.getIn(['editor', 'tabSize'], 2)
    const editorIndentSize = settings.getIn(['editor', 'indentSize'], 2)
    const preventAutoSave = settings.getIn(['editor', 'preventAutoSave'], false)

    return (
      <Modal
        noUI
        isOpened={isOpened}
        onClose={this.handleClose}
        className="SettingsModal p-10 d-f fd-c"
      >
        <div className="d-f ai-c mb-20">
          <Button transparent onClick={this.handleClose} className="ml-auto">
            <IconClose />
          </Button>
        </div>

        <div className="fg-1 mb-20 r">
          <TabsVertical>
            <TabItem title="MJML" icon={IconMJMLEngine}>
              <MJMLEngine />
              <div className="mt-10">{'Output:'}</div>
              <CheckBox
                className="mt-10"
                value={minifyOutput}
                onChange={this.changeMJMLSetting('minify')}
              >
                {'Minify HTML output'}
              </CheckBox>
              <CheckBox value={beautifyOutput} onChange={this.changeMJMLSetting('beautify')}>
                {'Beautify HTML output'}
              </CheckBox>
              <MjmlConfigPath />
            </TabItem>

            <TabItem title="Editor" icon={IconEditor}>
              <CheckBox value={editorLightTheme} onChange={this.changeEditorSetting('lightTheme')}>
                {'Use high-contrast theme'}
              </CheckBox>
              <CheckBox value={editorWrapLines} onChange={this.changeEditorSetting('wrapLines')}>
                {'Wrap lines'}
              </CheckBox>
              <CheckBox
                value={editorHightlightTag}
                onChange={this.changeEditorSetting('highlightTag')}
              >
                {'Highlight matching tag'}
              </CheckBox>
              <CheckBox value={autoFold} onChange={this.changeEditorSetting('autoFold')}>
                <div>{'Auto fold lines when opening file'}</div>
                <div className="mt-5">
                  {'Fold level:'}
                  <input
                    className="ml-5"
                    type="number"
                    min={1}
                    style={{ width: 80 }}
                    value={foldLevel}
                    onClick={e => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onChange={e => this.changeEditorSetting('foldLevel')(Number(e.target.value))}
                  />
                </div>
              </CheckBox>
              <CheckBox value={editorUseTab} onChange={this.changeEditorSetting('useTab')}>
                <div>{'User tab character'}</div>
                <div className="mt-5">
                  {'Tab size:'}
                  <input
                    className="ml-5"
                    type="number"
                    min={1}
                    style={{ width: 80 }}
                    value={editorTabSize}
                    onClick={e => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onChange={e => this.changeEditorSetting('tabSize')(Number(e.target.value))}
                  />
                </div>
              </CheckBox>
              <div className="mt-5">
                {'Indent size:'}
                <input
                  className="ml-5"
                  type="number"
                  min={1}
                  style={{ width: 80 }}
                  value={editorIndentSize}
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onChange={e => this.changeEditorSetting('indentSize')(Number(e.target.value))}
                />
              </div>
              <CheckBox
                value={preventAutoSave}
                onChange={this.changeEditorSetting('preventAutoSave')}
              >
                {'Don’t auto-save on change'}
              </CheckBox>
            </TabItem>

            <TabItem title="Preview" className="flow-v-10" icon={IconPreview}>
              <div className="d-f ai-c flow-h-5">
                <IconMobile size={20} />
                <input
                  type="number"
                  min={200}
                  style={{ width: 80 }}
                  value={sizes.mobile}
                  onChange={e => this.handleChangeSize('mobile', e.target.value)}
                />
                <span>{'Mobile size'}</span>
              </div>

              <div className="d-f ai-c flow-h-5">
                <IconDesktop size={20} />
                <input
                  type="number"
                  min={200}
                  style={{ width: 80 }}
                  value={sizes.desktop}
                  onChange={e => this.handleChangeSize('desktop', e.target.value)}
                />
                <span>{'Desktop size'}</span>
              </div>
            </TabItem>

            <TabItem title="Snippets" className="d-b" icon={IconCode}>
              <h1 className="c-white">{'Create and manage code snippets'}</h1>
              <p className="mt-10">{'Type a trigger and hit tab to expand it in the editor'}</p>
              <div className="Snippets d-f">
                <div className="fg-1">
                  <SnippetForm />
                </div>
                <div className="SnippetsList d-f flow-h-5 fg-1">
                  <SnippetsList />
                </div>
              </div>
            </TabItem>
          </TabsVertical>
        </div>
      </Modal>
    )
  }
}

export default SettingsModal
