import React, { Component } from 'react'
import path from 'path'
import { Link } from 'react-router'

class FolderItem extends Component {

  render () {

    const {
      folder,
      onClick,
    } = this.props

    const items = folder.split(path.sep)
    const n = items[items.length - 1]

    return (
      <Link
        to={`/folder?path=${folder}`}
        tabIndex={0}
        className='FolderItem unstyled'
        onClick={onClick}
      >
        <div className='FolderItem--thumbnail' />
        <div className='FolderItem--label'>
          {n}
        </div>
      </Link>
    )
  }

}

export default FolderItem
