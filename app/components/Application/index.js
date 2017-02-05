import React, { Component } from 'react'

import FileExplorer from 'components/FileExplorer'

import './style.scss'

export default class Application extends Component {
  render () {
    return (
      <div className='Application'>
        <div className='grow flex'>
          <div
            style={{
              width: 200,
              position: 'relative',
            }}
          >
            <FileExplorer />
          </div>
          <div>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
