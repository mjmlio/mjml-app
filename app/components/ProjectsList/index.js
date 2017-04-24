import React, { Component } from 'react'
import cx from 'classnames'
import path from 'path'
import { connect } from 'react-redux'
import IconClose from 'react-icons/md/close'

import { openProject, removeProject } from 'actions/projects'

import CheckBox from 'components/CheckBox'
import Preview from 'components/Preview'
import ConfirmModal from 'components/Modal/ConfirmModal'
import Tabbable from 'components/Tabbable'

import './style.scss'

@connect(state => ({
  projects: state.projects,
}), {
  openProject,
  removeProject,
})
class ProjectsList extends Component {

  state = {
    pathToDelete: null,
    isModalOpened: false,
    shouldDeleteFolder: false,
  }

  componentWillUnmount () {
    this._isUnmounted = true
  }

  handleRemoveProject = path => () => this.safeSetState({
    pathToDelete: path,
    isModalOpened: true,
  })

  handleConfirmRemove = () => {
    const { pathToDelete, shouldDeleteFolder } = this.state
    this.props.removeProject(pathToDelete, shouldDeleteFolder)
    this.handleCloseModal()
  }

  handleCloseModal = () => this.safeSetState({
    pathToDelete: null,
    isModalOpened: false,
  })

  handleChangeShouldDelete = shouldDeleteFolder => this.setState({ shouldDeleteFolder })

  safeSetState = (...args) => {
    if (this._isUnmounted) { return }
    this.setState(...args)
  }

  render () {

    const {
      openProject,
      isEditing,
      projects,
    } = this.props

    const {
      isModalOpened,
      shouldDeleteFolder,
    } = this.state

    return (
      <div
        className={cx('ProjectsList abs o-n', { isEditing })}
      >
        {projects.reverse().map((p) => (
          <button
            className='ProjectItem'
            key={p}
            onClick={isEditing ? undefined : () => openProject(p.get('path'))}
            tabIndex={isEditing ? -1 : 0}
          >
            <Tabbable
              className={cx('ProjectItem--delete-btn', { visible: isEditing })}
              onClick={this.handleRemoveProject(p.get('path'))}
            >
              <IconClose color='#fff' />
            </Tabbable>
            <div className='ProjectItem--preview-container'>
              <Preview scaled html={p.get('html', null)} />
            </div>
            <div className='ProjectItem--label'>
              {path.basename(p.get('path'))}
            </div>
          </button>
        ))}
        <ConfirmModal
          isOpened={isModalOpened}
          yepCTA={shouldDeleteFolder ? 'Remove from list and from disk' : 'Remove from list'}
          nopCTA='Cancel'
          onCancel={this.handleCloseModal}
          onConfirm={this.handleConfirmRemove}
        >
          <h2 className='mb-20'>{'Remove project from list?'}</h2>
          <CheckBox value={shouldDeleteFolder} onChange={this.handleChangeShouldDelete}>
            {'Also remove folder and files from disk'}
          </CheckBox>
        </ConfirmModal>
      </div>
    )
  }

}

export default ProjectsList
