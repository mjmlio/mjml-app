import React, { Component } from 'react'
import IconCreate from 'react-icons/md/create-new-folder'
import IconOpen from 'react-icons/md/file-download'
import { connect } from 'react-redux'

import { addProject, openProject } from 'actions/projects'
import { openModal } from 'reducers/modals'

import Button from 'components/Button'

@connect(state => ({
  projects: state.settings.get('projects'),
}), {
  addProject,
  openModal,
  openProject,
})
class HomePage extends Component {

  render () {

    const {
      addProject,
      openProject,
      openModal,
      projects,
    } = this.props

    return (
      <div className='fg-1 p-20'>

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

        {!!projects.size && (
          <div>
            <h2 className='mt-20'>{'Recent projects'}</h2>
            {projects.map(p => (
              <div
                key={p}
                onClick={() => openProject(p)}
              >
                {p}
              </div>
            ))}
          </div>
        )}

      </div>
    )
  }

}

export default HomePage
