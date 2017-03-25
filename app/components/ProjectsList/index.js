import React, { Component } from 'react'
import path from 'path'
import { connect } from 'react-redux'

import { openProject } from 'actions/projects'

import './style.scss'

@connect(state => ({
  projects: state.projects,
}), {
  openProject,
})
class ProjectsList extends Component {

  render () {

    const {
      openProject,
      projects,
    } = this.props

    return (
      <div className='ProjectsList abs'>
        {projects.reverse().map(p => (
          <div
            className='ProjectItem'
            key={p}
            onClick={() => openProject(p.get('path'))}
          >
            <div className='ProjectItem--preview-container'>
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
