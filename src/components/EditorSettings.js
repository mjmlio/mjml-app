import React, { Component } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'

import aceThemes from '../assets/aceThemes'
import Modal from './Modal'
import Button from './Button'
import { updateConfig } from '../actions'

@connect(
  state => ({
    config: state.config
  })
)
class EditorSettings extends Component {

  state = {
    modalOpened: false
  }

  openModal = () => this.setState({ modalOpened: true })
  closeModal = () => this.setState({ modalOpened: false })

  setTheme = e => {
    const theme = e.target.value
    this.props.dispatch(updateConfig(config => config.set('editorTheme', theme)))
  }

  setWrap = () => {
    this.props.dispatch(updateConfig(
      config => config.set('editorWrapText', !config.get('editorWrapText'))
    ))
  }

  render () {
    const { config } = this.props
    const { modalOpened } = this.state

    const editorTheme = config.get('editorTheme')

    return (
      <Button
        onClick={this.openModal}
        className={cx('EditorPage-bar-item', { active: modalOpened })}>

        <i className='ion-gear-b' />

        {'Settings'}

        <Modal isOpened={modalOpened} onClose={this.closeModal}>

          <h1>{'Editor theme'}</h1>

          <select onChange={this.setTheme} value={editorTheme} className='select-theme'>
            {aceThemes.map(theme =>
              <option key={theme[0]} value={theme[0]}>
                {theme[1]}
              </option>)}
          </select>

          <div>
            <label>
              <input
                type='checkbox'
                checked={config.get('editorWrapText')}
                onChange={this.setWrap} />
              {' Wrap lines'}
            </label>
          </div>

        </Modal>

      </Button>
    )
  }

}

export default EditorSettings
