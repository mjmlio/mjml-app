import React, { Component, createElement } from 'react'
import cx from 'classnames'

import Tabbable from 'components/Tabbable'
import Preview from 'components/Preview'

class SnippetItem extends Component {

  render() {
    const { name, trigger, content } = this.props

    return (
      <div className="SnippetItem">
            <b>{name}</b>
      </div>
    )
  }
}

export default SnippetItem
