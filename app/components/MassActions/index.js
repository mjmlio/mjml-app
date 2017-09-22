import React, { Component } from 'react'
import Collapse from 'react-collapse'
import { connect } from 'react-redux'

import { exportSelectedProjectsToHTML, exportSelectedProjectsToImages } from 'actions/projects'
import { selectAllProjects, unselectAllProjects } from 'reducers/selectedProjects'

import Button from 'components/Button'

import './style.scss'

@connect(
  state => ({
    projects: state.settings.get('projects'),
    selectedProjects: state.selectedProjects,
  }),
  {
    selectAllProjects,
    unselectAllProjects,
    exportSelectedProjectsToHTML,
    exportSelectedProjectsToImages,
  },
)
class MassActions extends Component {
  state = {
    isLoading: false,
  }

  handleExportToHTML = () => {
    this.props.exportSelectedProjectsToHTML()
    this.props.unselectAllProjects()
  }

  handleExportToImages = () => {
    this.setState({ isLoading: true })
    this.props.exportSelectedProjectsToImages(() => {
      this.setState({ isLoading: false })
      this.props.unselectAllProjects()
    })
  }

  render() {
    const { selectedProjects, selectAllProjects, unselectAllProjects } = this.props
    const { isLoading } = this.state
    const hasSelectedProjects = !!selectedProjects.length
    return (
      <Collapse
        className="MassActions"
        isOpened={hasSelectedProjects}
        springConfig={{ stiffness: 300, damping: 30 }}
      >
        <div className="p-20">
          <span onClick={selectAllProjects} className="a">
            {'Select all'}
          </span>
          {' - '}
          <span onClick={unselectAllProjects} className="a">
            {'Unselect all'}
          </span>
          <Button className="ml-10" primary onClick={this.handleExportToHTML}>
            {`Export to HTML (${selectedProjects.length})`}
          </Button>
          <Button
            disabled={isLoading}
            className="ml-10"
            primary
            onClick={this.handleExportToImages}
          >
            {isLoading ? 'Loading...' : `Export to images (${selectedProjects.length})`}
          </Button>
        </div>
      </Collapse>
    )
  }
}

export default MassActions
