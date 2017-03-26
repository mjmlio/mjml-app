import React, { Component } from 'react'
import cx from 'classnames'
import path from 'path'
import { connect } from 'react-redux'
import IconClose from 'react-icons/md/close'

import { openProject, removeProject } from 'actions/projects'

import Preview from 'components/Preview'

import './style.scss'

@connect(state => ({
  projects: state.projects,
}), {
  openProject,
  removeProject,
})
class ProjectsList extends Component {

  render () {

    const {
      openProject,
      removeProject,
      isEditing,
      projects,
    } = this.props

    return (
      <div className={cx('ProjectsList abs', { isEditing })}>
        {projects.reverse().map(p => (
          <div
            className='ProjectItem'
            key={p}
            onClick={isEditing ? undefined : () => openProject(p.get('path'))}
          >
            {isEditing && (
              <div
                className='ProjectItem--delete-btn'
                onClick={() => removeProject(p.get('path'))}
              >
                <IconClose color='#fff' />
              </div>
            )}
            <div className='ProjectItem--preview-container'>
              <Preview scaled html={p.get('html', null)} />
            </div>
            <div className='ProjectItem--label'>
              {path.basename(p.get('path'))}
            </div>
          </div>
        ))}
      </div>
    )
  }

}

export default ProjectsList
