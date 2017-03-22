import React, { Component } from 'react'
import IconCreate from 'react-icons/md/create-new-folder'
import IconOpen from 'react-icons/md/file-download'
import { connect } from 'react-redux'

import { addProject } from 'actions/projects'
import { openModal } from 'reducers/modals'

import Button from 'components/Button'

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
    } = this.props

    return (
      <div className='fg-1 z'>

        <div className='flow-h-20 d-f ai-c'>
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

      </div>
    )
  }

}

export default HomePage
