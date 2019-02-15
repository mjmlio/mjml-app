import React, { Component } from 'react'
import debounce from 'lodash/debounce'
import { connect } from 'react-redux'

import { updateSettings } from 'actions/settings'
import { fileDialog } from 'helpers/fs'

import Button from 'components/Button'
import CheckBox from 'components/CheckBox'

@connect(
  state => {
    const { settings } = state
    return {
      mjmlConfigPath: settings.getIn(['mjml', 'mjmlConfigPath'], ''),
      useMjmlConfig: settings.getIn(['mjml', 'useMjmlConfig'], false),
    }
  },
  {
    updateSettings,
  },
)
class MjmlConfigPath extends Component {
  state = {
    mjmlConfigPath: '',
  }

  componentWillMount() {
    const { mjmlConfigPath } = this.props

    this.setState({
      mjmlConfigPath: mjmlConfigPath || '',
    })
  }

  componentWillUnmount() {
    this._unmounted = true
  }

  handleChangePath = p => {
    this.setState({ mjmlConfigPath: p })
    this.debounceSaveSettings()
  }

  handleBrowse = () => {
    const p = fileDialog({
      properties: ['openFile', 'showHiddenFiles'],
    })
    if (!p) {
      return
    }
    this.handleChangePath(p)
  }

  debounceSaveSettings = debounce(() => {
    const { mjmlConfigPath } = this.state
    const { updateSettings } = this.props
    updateSettings(settings => {
      return settings.setIn(['mjml', 'mjmlConfigPath'], mjmlConfigPath)
    })
  }, 500)

  render() {
    const { useMjmlConfig, updateSettings } = this.props
    const { mjmlConfigPath } = this.state

    return (
      <div className="flow-v-10">
        <div className="mt-10">{'Custom components:'}</div>
        <CheckBox value={useMjmlConfig} onChange={val => updateSettings(settings => settings.setIn(['mjml', 'useMjmlConfig'], val))}>
          {'Use custom components (slightly slower preview refresh)'}
        </CheckBox>
        <div className="mt-10">{'Path of .mjmlconfig file (leave blank for default, will search for .mjmlconfig in the same folder as the mjml file) :'}</div>
        <div className="d-f ai-s fg-1">
          <input
            autoFocus
            className="fg-1"
            value={mjmlConfigPath}
            onChange={e => this.handleChangePath(e.target.value)}
            placeholder=".mjmlconfig path"
            type="text"
          />
          <Button ghost onClick={this.handleBrowse} type="button">
            {'Browse'}
          </Button>
        </div>
      </div>
    )
  }
}

export default MjmlConfigPath
