import React, { Component } from 'react'
import os from 'os'
import path from 'path'
import { connect } from 'react-redux'

const HOME_DIR = os.homedir()

import Modal from 'components/Modal'
import Button from 'components/Button'

import {
  isModalOpened,
  closeModal,
} from 'reducers/modals'

import './style.scss'

@connect(state => ({
  isOpened: isModalOpened(state, 'newProject'),
}), dispatch => ({
  closeModal: () => dispatch(closeModal('newProject')),
}))
class NewProjectModal extends Component {

  state = {
    projectName: '',
    projectLocation: HOME_DIR,
  }

  componentDidUpdate (prevProps) {
    if (!prevProps.isOpened && this.props.isOpened) {
      this._inputName.focus()
    }
  }

  handleSubmit = e => {
    e.preventDefault()

  }

  render () {

    const {
      isOpened,
      closeModal,
    } = this.props

    const {
      projectName,
      projectLocation,
    } = this.state

    const fullPath = (projectName && projectLocation)
      ? path.join(projectLocation, projectName)
      : null

    return (
      <Modal
        className='NewProjectModal'
        isOpened={isOpened}
        onClose={closeModal}
      >
        <form onSubmit={this.handleSubmit}>

          <h2>{'New Project'}</h2>

          <div className='flow-v-20'>
            <div className='d-f ai-b'>
              <div style={{ width: 150 }} className='fs-0'>
                {'Project name:'}
              </div>
              <input
                ref={n => this._inputName = n}
                className='fg-1'
                value={projectName}
                onChange={e => this.setState({ projectName: e.target.value })}
                placeholder='Project name'
                type='text'
                autoFocus
              />
            </div>

            <div className='d-f ai-b'>
              <div style={{ width: 150 }} className='fs-0'>
                {'Location:'}
              </div>
              <div className='fg-1'>
                <div className='d-f ai-s fg-1'>
                  <input
                    className='fg-1'
                    value={projectLocation}
                    onChange={e => this.setState({ projectLocation: e.target.value })}
                    placeholder='Location'
                    type='text'
                    autoFocus
                  />
                  <Button ghost>
                    {'Browse'}
                  </Button>
                </div>
                {fullPath && (
                  <div className='mt-10 t-small'>
                    {'Project will be created at: '}
                    <b className='c-white wb-ba'>
                      {fullPath}
                    </b>
                  </div>
                )}
              </div>
            </div>

          </div>

          <div className='ModalFooter'>
            <Button primary>
              {'Create'}
            </Button>
            <Button transparent onClick={closeModal}>
              {'Cancel'}
            </Button>
          </div>

        </form>
      </Modal>
    )
  }

}

export default NewProjectModal
