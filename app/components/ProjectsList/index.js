import React, { Component } from 'react'
import { connect } from 'react-redux'
import os from 'os'

import { openProject, removeProject, renameProject } from 'actions/projects'

import { toggleSelectProject } from 'reducers/selectedProjects'

import CheckBox from 'components/CheckBox'
import ConfirmModal from 'components/Modal/ConfirmModal'

import RenameModal from './RenameModal'
import ProjectItem from './ProjectItem'

import './style.scss'

const HOME_DIR = os.homedir()

@connect(
  state => ({
    projects: state.projects,
    selectedProjects: state.selectedProjects,
  }),
  {
    openProject,
    removeProject,
    renameProject,
    toggleSelectProject,
  },
)
class ProjectsList extends Component {
  state = {
    activePath: null,
    isDeleteModalOpened: false,
    isRenameModalOpened: false,
    shouldDeleteFolder: false,
  }

  componentWillUnmount() {
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
    const { removeProject } = this.props
    const isHome = activePath === HOME_DIR
    removeProject(activePath, isHome ? false : shouldDeleteFolder)
    this.handleCloseDeleteModal()
  }

  handleCloseDeleteModal = () =>
    this.safeSetState({
      activePath: null,
      isDeleteModalOpened: false,
    })

  handleChangeShouldDelete = shouldDeleteFolder => this.setState({ shouldDeleteFolder })

  handleCloseRenameModal = () =>
    this.safeSetState({
      activePath: null,
      isRenameModalOpened: false,
    })

  handleRename = newPath => {
    this.props.renameProject(this.state.activePath, newPath)
    this.handleCloseRenameModal()
  }

  safeSetState = (...args) => {
    if (this._isUnmounted) {
      return
    }
    this.setState(...args)
  }

  render() {
    const { openProject, projects, selectedProjects, toggleSelectProject } = this.props

    const { isDeleteModalOpened, isRenameModalOpened, shouldDeleteFolder, activePath } = this.state

    const isHome = activePath === HOME_DIR

    return (
      <div className="ProjectsList abs o-n">
        {projects.reverse().map(p => {
          const projectPath = p.get('path')
          return (
            <ProjectItem
              key={p}
              p={p}
              isSelected={selectedProjects.indexOf(projectPath) > -1}
              onToggleSelect={() => toggleSelectProject(projectPath)}
              onRemove={this.handleRemoveProject(projectPath)}
              onOpen={() => openProject(projectPath)}
              onEditName={this.handleEditProjectName(projectPath)}
            />
          )
        })}
        <ConfirmModal
          isOpened={isDeleteModalOpened}
          yepCTA={shouldDeleteFolder ? 'Remove from list and from disk' : 'Remove from list'}
          nopCTA="Cancel"
          onCancel={this.handleCloseDeleteModal}
          onConfirm={this.handleConfirmRemove}
        >
          <h2 className="mb-20">
            {'Remove project from list?'}
          </h2>
          {!isHome &&
            <CheckBox value={shouldDeleteFolder} onChange={this.handleChangeShouldDelete}>
              {'Also remove folder and files from disk'}
            </CheckBox>}
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
