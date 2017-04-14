import React, { Component } from 'react'
import debounce from 'lodash/debounce'
import { connect } from 'react-redux'
import IconMobile from 'react-icons/md/phone-android'
import IconDesktop from 'react-icons/md/desktop-windows'

import { isModalOpened, closeModal } from 'reducers/modals'
import { updateSettings } from 'actions/settings'

import Modal from 'components/Modal'
import CheckBox from 'components/CheckBox'

import MJMLEngine from 'components/MJMLEngine'

@connect(state => ({
  isOpened: isModalOpened(state, 'settings'),
  mobileSize: state.settings.getIn(['previewSize', 'mobile']),
  desktopSize: state.settings.getIn(['previewSize', 'desktop']),
  settings: state.settings,
}), {
  closeModal,
  updateSettings,
})
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

  render () {

    const {
      isOpened,
      settings,
    } = this.props

    const {
      sizes,
    } = this.state

    const editorWrapLines = settings.getIn(['editor', 'wrapLines'], true)

    return (
      <Modal
        isOpened={isOpened}
        onClose={this.handleClose}
      >
        <div className='Modal--label'>
          {'Settings'}
        </div>
        <div className='d-f ai-fs'>
          <div className='fg-1 mr-20 flow-v-20'>

            <div>
              <h2 className='secondary mb-10'>{'MJML'}</h2>
              <MJMLEngine />
            </div>

            <div>
              <h2 className='secondary mb-10'>{'Editor'}</h2>

              <div className='flow-v-10'>
                <CheckBox value={editorWrapLines} onChange={this.changeEditorSetting('wrapLines')}>
                  {'Wrap lines'}
                </CheckBox>

                <div className='d-f ai-c flow-h-5'>
                  <IconMobile size={20} />
                  <input
                    type='number'
                    min={200}
                    style={{ width: 80 }}
                    value={sizes.mobile}
                    onChange={e => this.handleChangeSize('mobile', e.target.value)}
                  />
                  <span>
                    {'Mobile size'}
                  </span>
                </div>

                <div className='d-f ai-c flow-h-5'>
                  <IconDesktop size={20} />
                  <input
                    type='number'
                    min={200}
                    style={{ width: 80 }}
                    value={sizes.desktop}
                    onChange={e => this.handleChangeSize('desktop', e.target.value)}
                  />
                  <span>
                    {'Desktop size'}
                  </span>
                </div>
              </div>

            </div>

          </div>
          <div style={{ width: 200 }}>
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
    )
  }

}

export default SettingsModal
