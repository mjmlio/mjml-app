import React, { Component } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'

import aceThemes from '../assets/aceThemes'
import Modal from './Modal'
import Button from './Button'
import { updateConfig } from '../actions'

@connect(
  state => ({
    config: state.config,
  })
)
class EditorSettings extends Component {

  state = {
    modalOpened: false,
  }

  /**
   * Opens the configuration modal
   *
   * @returns {undefined}
   */
  openModal = () => this.setState({ modalOpened: true })

  /**
   * Closes the config modal
   *
   * @returns {undefined}
   */
  closeModal = () => this.setState({ modalOpened: false })

  /**
   * Set the selected theme
   *
   * @param {Object} e the event that triggered this
   * @returns {undefined}
   */
  setTheme = e => {
    const theme = e.target.value
    this.props.dispatch(updateConfig(config => config.set('editorTheme', theme)))
  }

  /**
   * Toggle the wrap mode in ace editor
   *
   */
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
                defaultChecked={config.get('editorWrapText')}
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
