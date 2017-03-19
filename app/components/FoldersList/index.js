import React, { Component } from 'react'
import FaPlus from 'react-icons/fa/plus'

import FolderItem from './FolderItem'

import './styles.scss'

class FoldersList extends Component {

  componentDidMount () {
    this._btnAdd.focus()
  }

  render () {

    const {
      folders,
      onClickAdd,
    } = this.props

    return (
      <div className='FoldersList'>
        {onClickAdd && (
          <button
            ref={n => this._btnAdd = n}
            tabIndex={0}
            className='FoldersList--add-btn'
            onClick={() => onClickAdd()}
          >
            <FaPlus size={30} />
          </button>
        )}
        {folders.map(f => (
          <FolderItem
            key={f}
            folder={f}
          />
        ))}
      </div>
    )
  }

}

export default FoldersList
