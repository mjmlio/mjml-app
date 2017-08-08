import React, { Component } from 'react'
import debounce from 'lodash/debounce'
import pathModule from 'path'
import IconCheck from 'react-icons/md/check-circle'
import IconChecking from 'react-icons/md/autorenew'
import IconError from 'react-icons/md/error'

import { alreadyExists } from 'helpers/fs'

import ConfirmModal from 'components/Modal/ConfirmModal'

class RenameModal extends Component {
  state = {
    newName: '',
    oldName: '',
    // unset / checking / valid / invalid
    projectLocStatus: 'unset',
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpened && !this.props.isOpened) {
      this.setState({
        newName: pathModule.basename(nextProps.path),
        oldName: pathModule.basename(nextProps.path),
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.isOpened && !prevProps.isOpened) {
      this._inputName.focus()
    }
  }

  handleConfirm = e => {
    e && e.preventDefault()

    const { newName, projectLocStatus } = this.state

    if (projectLocStatus !== 'valid') {
      return
    }

    const { path } = this.props

    const dir = path ? pathModule.dirname(path) : null
    const fullPath = newName && dir ? pathModule.join(dir, newName) : null

    this.props.onConfirm(fullPath)
  }

  handleChangeNewName = e => {
    const newName = e.target.value
    this.setState({
      newName,
      projectLocStatus: newName ? 'checking' : 'unset',
    })
    if (newName) {
      this.debounceCheckName()
    }
  }

  debounceCheckName = debounce(async () => {
    const { path } = this.props
    const { newName } = this.state
    if (!newName) {
      return this.setState({
        projectLocStatus: 'unset',
      })
    }
    const dir = pathModule.dirname(path)
    const full = pathModule.join(dir, newName)
    const exists = await alreadyExists(full)
    this.setState({
      projectLocStatus: exists ? 'invalid' : 'valid',
    })
  }, 250)

  render() {
    const { isOpened, onCancel, path } = this.props

    const { newName, oldName, projectLocStatus } = this.state

    const hasChanged = newName !== oldName
    const dir = path ? pathModule.dirname(path) : null
    const fullPath = newName && dir ? pathModule.join(dir, newName) : null

    return (
      <ConfirmModal
        isOpened={isOpened}
        yepCTA={'Rename project'}
        nopCTA="Cancel"
        onCancel={onCancel}
        onConfirm={this.handleConfirm}
        isConfirmDisabled={!hasChanged || !newName || projectLocStatus !== 'valid'}
      >
        <form onSubmit={this.handleConfirm}>
          <h2 className="mb-20">
            {'Rename project'}
          </h2>
          <div className="flow-v-20">
            <div className="d-f ai-b">
              <div style={{ width: 150 }} className="fs-0">
                {'New name:'}
              </div>
              <div className="fg-1">
                <input
                  style={{ width: '100%' }}
                  ref={n => (this._inputName = n)}
                  className="fg-1"
                  value={newName}
                  onChange={this.handleChangeNewName}
                  placeholder="New name"
                  type="text"
                />
                {fullPath &&
                  <div className="mt-10 t-small">
                    {'Project will be renamed to: '}
                    <b className="c-white wb-ba">
                      {fullPath}
                    </b>
                  </div>}
                {projectLocStatus === 'checking' &&
                  <div className="t-small mt-10">
                    <IconChecking className="rotating mr-5" />
                    {'Checking...'}
                  </div>}
                {projectLocStatus === 'valid' &&
                  <div className="t-small mt-10 c-green">
                    <IconCheck className="mr-5" />
                    {'Location is OK'}
                  </div>}
                {projectLocStatus === 'invalid' &&
                  <div className="t-small mt-10 c-red">
                    <IconError className="mr-5" />
                    {'Directory exists and is not empty'}
                  </div>}
              </div>
            </div>
          </div>
        </form>
      </ConfirmModal>
    )
  }
}

export default RenameModal
