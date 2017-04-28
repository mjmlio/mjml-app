import React, { Component } from 'react'
import path from 'path'
import { connect } from 'react-redux'
import IconClose from 'react-icons/md/close'
import IconEdit from 'react-icons/md/mode-edit'

import {
  openProject,
  removeProject,
  renameProject,
} from 'actions/projects'

import CheckBox from 'components/CheckBox'
import Preview from 'components/Preview'
import ConfirmModal from 'components/Modal/ConfirmModal'
import Tabbable from 'components/Tabbable'

import RenameModal from './RenameModal'

import './style.scss'

@connect(state => ({
  projects: state.projects,
}), {
  openProject,
  removeProject,
  renameProject,
})
class ProjectsList extends Component {

  state = {
    activePath: null,
    isDeleteModalOpened: false,
    isRenameModalOpened: false,
    shouldDeleteFolder: false,
  }

  componentWillUnmount () {
    this._isUnmounted = true
  }

  handleRemoveProject = path => e => {
    e.preventDefault()
    e.stopPropagation()
    this.safeSetState({
      activePath: path,
      isDeleteModalOpened: true,
    })
  }

  handleEditProjectName = path => e => {
    e.preventDefault()
    e.stopPropagation()
    this.safeSetState({
      activePath: path,
      isRenameModalOpened: true,
    })
  }

  handleConfirmRemove = () => {
    const { activePath, shouldDeleteFolder } = this.state
    this.props.removeProject(activePath, shouldDeleteFolder)
    this.handleCloseDeleteModal()
  }

  handleCloseDeleteModal = () => this.safeSetState({
    activePath: null,
    isDeleteModalOpened: false,
  })

  handleChangeShouldDelete = shouldDeleteFolder => this.setState({ shouldDeleteFolder })

  handleCloseRenameModal = () => this.safeSetState({
    activePath: null,
    isRenameModalOpened: false,
  })

  handleRename = newPath => {
    this.props.renameProject(this.state.activePath, newPath)
    this.handleCloseRenameModal()
  }

  safeSetState = (...args) => {
    if (this._isUnmounted) { return }
    this.setState(...args)
  }

  render () {

    const {
      openProject,
      projects,
    } = this.props

    const {
      isDeleteModalOpened,
      isRenameModalOpened,
      shouldDeleteFolder,
      activePath,
    } = this.state

    return (
      <div className='ProjectsList abs o-n'>
        {projects.reverse().map((p) => (
          <div
            className='ProjectItem'
            key={p}
          >
            <Tabbable
              className='ProjectItem--delete-btn'
              onClick={this.handleRemoveProject(p.get('path'))}
            >
              <IconClose color='#fff' />
            </Tabbable>
            <Tabbable
              onClick={() => openProject(p.get('path'))}
              className='ProjectItem--preview-container-wrapper'
            >
              <div className='ProjectItem--preview-container'>
                <Preview scaled html={p.get('html', null)} />
              </div>
            </Tabbable>
            <div className='d-f ai-b pl-5 pr-5'>
              <div className='ProjectItem--label'>
                {path.basename(p.get('path'))}
              </div>
              <button
                className='ProjectItem--edit-btn ml-5 pl-5 pr-5'
                onClick={this.handleEditProjectName(p.get('path'))}
              >
                <IconEdit />
              </button>
            </div>
          </div>
        ))}
        <ConfirmModal
          isOpened={isDeleteModalOpened}
          yepCTA={shouldDeleteFolder ? 'Remove from list and from disk' : 'Remove from list'}
          nopCTA='Cancel'
          onCancel={this.handleCloseDeleteModal}
          onConfirm={this.handleConfirmRemove}
        >
          <h2 className='mb-20'>{'Remove project from list?'}</h2>
          <CheckBox value={shouldDeleteFolder} onChange={this.handleChangeShouldDelete}>
            {'Also remove folder and files from disk'}
          </CheckBox>
        </ConfirmModal>
        <RenameModal
          isOpened={isRenameModalOpened}
          path={activePath}
          onCancel={this.handleCloseRenameModal}
          onConfirm={this.handleRename}
        />
      </div>
    )
  }

}

export default ProjectsList
