import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addFolder } from 'actions/folders'

import FoldersList from 'components/FoldersList'
import Button from 'components/Button'

@connect(state => ({
  folders: state.settings.get('folders'),
}), {
  addFolder,
})
class HomePage extends Component {

  componentDidMount () {
    this.focusWatchIfNeeded()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.folders.size !== this.props.folders.size) {
      this.focusWatchIfNeeded()
    }
  }

  focusWatchIfNeeded = () => {
    if (this.props.folders.size === 0) {
      this._btnAdd.focus()
    }
  }

  render () {

    const {
      folders,
      addFolder,
    } = this.props

    return (
      <div className='p-10 flow-v-20'>
        {folders.size === 0 ? (
          <div className='sticky z'>
            <div className='mb-20'>
              {'You have no folders.'}
            </div>
            <Button primary onClick={() => addFolder()} ref={n => this._btnAdd = n}>
              {'Watch one'}
            </Button>
          </div>
        ) : (
          <FoldersList
            folders={folders}
            onClickAdd={addFolder}
          />
        )}
      </div>
    )
  }

}

export default HomePage
