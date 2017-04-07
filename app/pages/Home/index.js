import React, { Component } from 'react'
import cx from 'classnames'
import IconCreate from 'react-icons/md/create-new-folder'
import IconOpen from 'react-icons/md/file-download'
import IconCheck from 'react-icons/md/check-circle'
import FaCog from 'react-icons/fa/cog'
import { connect } from 'react-redux'

import { addProject } from 'actions/projects'
import { openModal } from 'reducers/modals'

import Button from 'components/Button'
import ProjectsList from 'components/ProjectsList'

import './style.scss'

@connect(state => ({
  projects: state.settings.get('projects'),
}), {
  addProject,
  openModal,
})
class HomePage extends Component {

  state = {
    isEditing: false,
  }

  componentDidMount () {
    if (this.props.projects.size === 0) {
      this._newProjectBTN.focus()
    }
  }

  focusNew = () => this._newProjectBTN.focus()

  preventAndEdit = isEditing => e => {
    e.stopPropagation()
    e.preventDefault()
    this.setState({ isEditing })
  }

  render () {

    const {
      isEditing,
    } = this.state

    const {
      addProject,
      openModal,
      projects,
    } = this.props

    const hasProjects = !!projects.size

    return (
      <div
        className={cx({
          'fg-1 d-f fd-c p-10': hasProjects,
          'fg-1 z': !hasProjects,
        })}
      >

        <div className='flow-h-5 d-f ai-c'>
          <Button
            ref={n => this._newProjectBTN = n}
            primary
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
          <div className={cx({ 'ml-auto': hasProjects })}>
            <Button ghost onClick={() => openModal('settings')}>
              <FaCog />
            </Button>
          </div>
        </div>

        {hasProjects && (
          <div className='fg-1 d-f fd-c anim-enter-fade'>
            <h2 className='mt-20 mb-20 d-f ai-c' style={{ height: 40 }}>
              {'Recent projects'}
              <div className='Home--edit-thing t-small d-f ai-c'>
                <div className='ml-10 mr-10'>
                  {'-'}
                </div>
                {isEditing ? (
                  <Button
                    onClick={this.preventAndEdit(false)}
                    ghost
                  >
                    <IconCheck className='mr-5' />
                    {'Finish'}
                  </Button>
                ) : (
                  <a
                    href=''
                    tabIndex={0}
                    className='Home--edit-link'
                    onClick={this.preventAndEdit(true)}
                  >
                    {'edit'}
                  </a>
                )}
              </div>
            </h2>
            <div className='fg-1 r'>
              <ProjectsList isEditing={isEditing} />
            </div>
          </div>
        )}

      </div>
    )
  }

}

export default HomePage
