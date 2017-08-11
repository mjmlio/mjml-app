import React, { Component } from 'react'
import Collapse from 'react-collapse'
import { connect } from 'react-redux'

import { exportSelectedProjectsToHTML } from 'actions/projects'
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
  },
)
class MassActions extends Component {
  handleExportSelected = () => {
    this.props.exportSelectedProjectsToHTML()
    this.props.unselectAllProjects()
  }

  render() {
    const { selectedProjects, selectAllProjects, unselectAllProjects } = this.props
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
          <Button className="ml-10" primary onClick={this.handleExportSelected}>
            {`Export selected to HTML (${selectedProjects.length})`}
          </Button>
        </div>
      </Collapse>
    )
  }
}

export default MassActions
