import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from 'components/Button'
import { duplicateProject } from 'actions/projects'

@connect(null, {
  duplicateProject,
})
class DuplicateProjectButton extends Component {
  render() {
    const { projectPath, className, duplicateProject } = this.props
    return (
      <Button primary className={className} onClick={() => duplicateProject(projectPath)}>
        {'Duplicate project'}
      </Button>
    )
  }
}

export default DuplicateProjectButton
