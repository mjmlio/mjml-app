import React, { Component } from 'react'
import Collapse from 'react-collapse'
import cx from 'classnames'
import IconCreate from 'react-icons/md/create-new-folder'
import IconOpen from 'react-icons/md/file-download'
import FaCog from 'react-icons/fa/cog'
import { connect } from 'react-redux'

import { addProject, exportSelectedProjectsToHTML } from 'actions/projects'
import { openModal } from 'reducers/modals'
import { selectAllProjects, unselectAllProjects } from 'reducers/selectedProjects'

import Button from 'components/Button'
import ProjectsList from 'components/ProjectsList'
import NotifBtn from 'components/Notifs/NotifBtn'

import './style.scss'

@connect(
  state => ({
    projects: state.settings.get('projects'),
    selectedProjects: state.selectedProjects,
  }),
  {
    addProject,
    openModal,
    selectAllProjects,
    unselectAllProjects,
    exportSelectedProjectsToHTML,
  },
)
class HomePage extends Component {
  componentDidMount() {
    if (this.props.projects.size === 0) {
      this._newProjectBTN.focus()
    }
  }

  handleExportSelected = () => {
    this.props.exportSelectedProjectsToHTML()
    this.props.unselectAllProjects()
  }

  focusNew = () => this._newProjectBTN.focus()

  render() {
    const {
      addProject,
      openModal,
      projects,
      selectedProjects,
      selectAllProjects,
      unselectAllProjects,
    } = this.props

    const hasProjects = !!projects.size
    const hasSelectedProjects = !!selectedProjects.length

    return (
      <div
        className={cx({
          'fg-1 d-f fd-c p-10': hasProjects,
          'fg-1 z': !hasProjects,
        })}
      >
        <div className="flow-h-10 d-f ai-c">
          <Button
            ref={n => (this._newProjectBTN = n)}
            primary
            onClick={() => openModal('newProject')}
          >
            <IconCreate size={20} className="mr-5" />
            {'New project'}
          </Button>
          <Button ghost onClick={() => addProject()}>
            <IconOpen size={20} className="mr-5" />
            {'Open project'}
          </Button>
          <div className={cx('d-f', { 'ml-auto': hasProjects })}>
            <Button ghost onClick={() => openModal('settings')}>
              <FaCog />
            </Button>
            <NotifBtn />
          </div>
        </div>

        {hasProjects &&
          <div className="fg-1 d-f fd-c anim-enter-fade">
            <Collapse isOpened={hasSelectedProjects} springConfig={{ stiffness: 300, damping: 30 }}>
              <div className="p-v-20" style={{ paddingTop: 30 }}>
                <span onClick={selectAllProjects} className="a">
                  {'Select all'}
                </span>
                {' - '}
                <span onClick={unselectAllProjects} className="a">
                  {'Unselect all'}
                </span>
                <Button className="ml-10" primary onClick={this.handleExportSelected}>
                  {`Export selected to HTML (${selectedProjects.length})`}
                </Button>
              </div>
            </Collapse>
            <div className="fg-1 r mt-20">
              <ProjectsList />
            </div>
          </div>}
      </div>
    )
  }
}

export default HomePage
