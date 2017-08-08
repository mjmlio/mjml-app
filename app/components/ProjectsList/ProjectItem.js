import React, { Component, createElement } from 'react'
import cx from 'classnames'
import path from 'path'
import IconClose from 'react-icons/md/close'
import IconEdit from 'react-icons/md/mode-edit'
import IconUnselected from 'react-icons/md/radio-button-unchecked'
import IconSelected from 'react-icons/md/check'

import Tabbable from 'components/Tabbable'
import Preview from 'components/Preview'

class ProjectItem extends Component {
  state = {
    isOver: false,
  }

  setOver = isOver => () => this.setState({ isOver })

  render() {
    const { onRemove, onOpen, onEditName, onToggleSelect, isSelected, p } = this.props

    const { isOver } = this.state

    return (
      <div
        className="ProjectItem"
        onMouseOver={this.setOver(true)}
        onMouseOut={this.setOver(false)}
      >
        <Tabbable onClick={onOpen} className="ProjectItem--preview-container-wrapper">
          <div className="ProjectItem--preview-container">
            <Preview scaled html={p.get('html', null)} iframeBase={p.get('path')} />
          </div>
        </Tabbable>
        <div className="d-f ai-b pl-5 pr-5">
          <div className="ProjectItem--label">
            {path.basename(p.get('path'))}
          </div>
          <button
            disabled={!isOver}
            className="ProjectItem--edit-btn ml-5 pl-5 pr-5"
            onClick={onEditName}
          >
            <IconEdit />
          </button>
        </div>
        <Tabbable
          disabled={!isOver && !isSelected}
          className={cx('ProjectItem--action-btn ProjectItem--select-btn', {
            isActive: isSelected,
          })}
          onClick={onToggleSelect}
        >
          {createElement(isSelected ? IconSelected : IconUnselected, {
            size: 20,
          })}
        </Tabbable>
        <Tabbable
          disabled={!isOver}
          className="ProjectItem--action-btn ProjectItem--delete-btn"
          onClick={onRemove}
        >
          <IconClose color="#fff" />
        </Tabbable>
      </div>
    )
  }
}

export default ProjectItem
