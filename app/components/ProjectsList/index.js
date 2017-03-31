import React, { Component } from 'react'
import cx from 'classnames'
import path from 'path'
import { connect } from 'react-redux'
import IconClose from 'react-icons/md/close'

import { openProject, removeProject } from 'actions/projects'

import Preview from 'components/Preview'
import ConfirmModal from 'components/Modal/ConfirmModal'

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
  }

  handleRemoveProject = path => () => this.setState({
    pathToDelete: path,
    isModalOpened: true,
  })

  handleConfirmRemove = () => {
    this.props.removeProject(this.state.pathToDelete)
    this.handleCloseModal()
  }

  handleCloseModal = () => this.setState({
    pathToDelete: null,
    isModalOpened: false,
  })

  render () {

    const {
      openProject,
      isEditing,
      projects,
    } = this.props

    const {
      isModalOpened,
    } = this.state

    return (
      <div className={cx('ProjectsList abs', { isEditing })}>
        {projects.reverse().map(p => (
          <button
            className='ProjectItem'
            key={p}
            onClick={isEditing ? undefined : () => openProject(p.get('path'))}
          >
            <div
              className={cx('ProjectItem--delete-btn', { visible: isEditing })}
              onClick={this.handleRemoveProject(p.get('path'))}
            >
              <IconClose color='#fff' />
            </div>
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
          onCancel={this.handleCloseModal}
          onConfirm={this.handleConfirmRemove}
        >
          <h2 className='mb-20'>{'Remove project from list?'}</h2>
          {'This will not remove the files on your disk :)'}
          <br />
        </ConfirmModal>
      </div>
    )
  }

}

export default ProjectsList
