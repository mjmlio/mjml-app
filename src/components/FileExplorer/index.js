import React, { Component } from 'react'
import promisify from 'es6-promisify'
import settings from 'electron-settings'
import fs from 'fs'
import path from 'path'
import FaFolder from 'react-icons/fa/folder'

const readDir = promisify(fs.readdir)
const stat = promisify(fs.stat)

import './style.scss'

function getFileInfoFactory (p, fileName) {
  return async fileName => {
    try {
      const stats = await stat(path.resolve(p, fileName))
      return {
        fileName,
        isFolder: stats.isDirectory(),
      }
    } catch (err) {
      return {
        fileName,
        isFolder: false,
      }
    }
  }
}

async function computeDir (p) {
  const filesList = await readDir(p)
  const filtered = filesList.filter(f => !f.startsWith('.'))
  const getFileInfo = getFileInfoFactory(p)
  const enriched = await Promise.all(filtered.map(getFileInfo))
  enriched.sort((a, b) => {
    if (a.isFolder && !b.isFolder) { return -1 }
    if (!a.isFolder && b.isFolder) { return 1 }
    const aName = a.fileName.toLowerCase()
    const bName = b.fileName.toLowerCase()
    if (aName < bName) { return -1 }
    if (aName > bName) { return 1 }
    return 0
  })
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
          <div className='FileItem' key={file.fileName}>
            {file.isFolder && (
              <div className='no-shrink'>
                <FaFolder />
              </div>
            )}
            {file.fileName}
          </div>
        ))}
      </div>
    )
  }

}

export default FileExplorer
