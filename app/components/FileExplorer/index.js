import React, { Component } from 'react'
import promisify from 'es6-promisify'
import settings from 'electron-settings'
import fs from 'fs'
import path from 'path'

const readDir = promisify(fs.readdir)
const stat = promisify(fs.stat)

import './style.scss'

async function getFileInfo (p, fileName) {
  try {
    const stats = await stat(path.resolve(p, fileName))
    return {
      fileName,
      isDirectory: stats.isDirectory(),
    }
  } catch (err) {
    return {
      fileName,
      isDirectory: false,
    }
  }
}

async function computeDir (p) {
  const filesList = await readDir(p)
  const enriched = await Promise.all(filesList.map(
    fileName => getFileInfo(p, fileName)
  ))
  return enriched
}

class FileExplorer extends Component {

  state = {
    isLoading: true,
    filesList: [],
  }

  async componentDidMount () {
    const initialFolder = await settings.get('initialFolder')
    const filesList = await computeDir(initialFolder)
    this.setState({
      filesList,
    })
  }

  render () {

    const {
      filesList,
    } = this.state

    return (
      <div className='FileExplorer'>
        {filesList.map(file => (
          <div key={file.fileName}>
            {file.fileName + ' ' + file.isDirectory}
          </div>
        ))}
      </div>
    )
  }

}

export default FileExplorer
