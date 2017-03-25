import React, { Component } from 'react'
import IconCreate from 'react-icons/md/create-new-folder'
import IconOpen from 'react-icons/md/file-download'
import { connect } from 'react-redux'

import { addProject, openProject } from 'actions/projects'
import { openModal } from 'reducers/modals'

import Button from 'components/Button'
import ProjectsList from 'components/ProjectsList'

@connect(state => ({
  projects: state.settings.get('projects'),
}), {
  addProject,
  openModal,
})
class HomePage extends Component {

  render () {

    const {
      addProject,
      openModal,
      projects,
    } = this.props

    return (
      <div className='fg-1 d-f fd-c p-20'>

        <div className='flow-h-20 d-f ai-c jc-fe'>
          <Button
            primary
            autoFocus
            onClick={() => openModal('newProject')}
          >
            <IconCreate size={20} className='mr-5' />
            {'New project'}
          </Button>
          <Button
            ghost
            onClick={() => addProject()}
          >
            <IconOpen size={20} className='mr-5' />
            {'Open project'}
          </Button>
        </div>

        {!projects.size ? (
          <div>{'no projects eheheheh'}</div>
        ) : (
          <div className='fg-1 d-f fd-c'>
            <h2 className='mt-20'>{'Recent projects'}</h2>
            <div className='fg-1 r'>
              <ProjectsList />
            </div>
          </div>
        )}

      </div>
    )
  }

}

export default HomePage
