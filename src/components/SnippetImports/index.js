import React, { Component } from 'react'
import { connect } from 'react-redux'
import os from 'os'
import { find } from 'lodash'

import Button from 'components/Button'

import { addSnippet, updateSnippet } from 'actions/snippets'
import { addAlert } from 'reducers/alerts'

const HOME_DIR = os.homedir()

import {
  saveDialog,
  fileDialog,
  fsWriteFile,
  fsReadFile,
} from 'helpers/fs'

export default connect(
  state => ({
    settings: state.settings,
  }),
  {
    addSnippet,
    updateSnippet,
    addAlert,
  },
)(
  class SnippetImports extends Component {
    async importSnippets() {
      const { settings, addSnippet } = this.props
      const existingSnippets = settings.get('snippets')
      
      const filePath = fileDialog({
        title: 'Import Snippets from JSON file',
        defaultPath: HOME_DIR,
        properties: ['openFile'],
        filters: [{ name: 'JSON Files', extensions: ['json'] }],
      })
      
      if (!filePath) return
      
      const newSnippetsJson = await fsReadFile(filePath)
      const newSnippets = JSON.parse(newSnippetsJson)
      
      for (const snippet of newSnippets) {        
        const exists = !!existingSnippets.find(s => s.name === snippet.name)
                    || !!existingSnippets.find(s => s.trigger === snippet.trigger)

        if (!exists) {
          addSnippet(snippet.name, snippet.trigger, snippet.content)
        }
      }
    }
    
    async exportSnippets() {
      const { settings, addAlert } = this.props
      const snippets = settings.get('snippets')
      
      const filePath = saveDialog({
        title: 'Export Snippets to JSON file',
        defaultPath: HOME_DIR,
        filters: [{ name: 'All Files', extensions: ['json'] }],
      })
      
      if (!filePath) return
      
      await fsWriteFile(filePath, JSON.stringify(snippets))
      
      addAlert('JSON successfully created!', 'success')
    }

    render() {
      return (
        <div className="w-100 bt-white p-v-20">
          <div className="mb-20">
            <Button
              primary
              onClick={() => this.importSnippets()}
            >
              {'Import snippets from JSON file'}
            </Button>
          </div>
          <div className="mb-20">
            <Button
              primary
              onClick={() => this.exportSnippets()}
            >
              {'Export snippets into JSON file'}
            </Button>
          </div>
        </div>
      )
    }
  },
)
