import fs from 'fs'
import React, { Component } from 'react'
import debounce from 'lodash/debounce'
import { connect } from 'react-redux'
import { handleMjmlConfig } from 'mjml'

import IconCheck from 'react-icons/md/check-circle'
import IconChecking from 'react-icons/md/autorenew'
import IconError from 'react-icons/md/error'
import IconWarning from 'react-icons/md/warning'

import { updateSettings } from 'actions/settings'

import Button from 'components/Button'
// import RadioGroup from 'components/RadioGroup'
// import Radio from 'components/RadioGroup/Radio'


@connect(
  state => {
    const { settings } = state
    return {
      mjmlConfigPath: settings.getIn(['mjml', 'mjmlConfigPath'], ''),
      mjmlEngine: settings.getIn(['mjml', 'engine'], 'auto'),
    }
  },
  {
    updateSettings,
  },
)
class MjmlConfigPath extends Component {
  state = {
    mjmlConfigPath: '',
    // unset / checking / valid / invalid / warning
    pathStatus: 'unset',
    message: {},
  }

  componentWillMount() {
    const { mjmlConfigPath } = this.props
    this.setState({
      mjmlConfigPath,
      pathStatus: mjmlConfigPath ? 'checking' : 'unset',
    })
  }

  componentDidMount() {
    const { mjmlConfigPath } = this.state
    if (mjmlConfigPath) {
      window.requestIdleCallback(() => {
        this.checkMjmlConfig(mjmlConfigPath)
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.mjmlEngine !== this.props.mjmlEngine) {
      this.checkMjmlConfig(this.state.mjmlConfigPath)
    }
  }

  componentWillUnmount() {
    this._unmounted = true
  }

  handleChangePath = p => {
    if (!p) {
      return this.setState({ pathStatus: 'unset', mjmlConfigPath: '' })
    }
    this.setState({ mjmlConfigPath: p })
    this.checkMjmlConfig(p)
    this.debounceSaveSettings()
  }

  handleBrowse = () => {
    const p = fileDialog({
      properties: ['openFile'],
    })
    if (!p) {
      return
    }
    this.handleChangePath(p)
  }

  formatTestResult(result) {
    const { error, success, failures } = result

    if (success) {
      const formattedFailures = failures.map(f => {
        if (f.error.code === 'ENOENT' || f.error.code === 'MODULE_NOT_FOUND') {
          return `File not found or unreadable : ${f.compPath}`
        }
        return `Error when registering component "${f.compPath}" - ${f.error}`
      })

      return {
        pathStatus: failures.length ? 'warning' : 'valid',
        message: [
          `${success.length} component(s) successfully registered:`,
          ...(success.length ? success : ['none']),
          failures.length ? `${failures.length} error(s):` : 'No errors during registration',
          ...formattedFailures
        ].join('<br/>'),
      }
    }

    if (error) return {
      pathStatus: 'invalid',
      message: error.code === 'ENOENT' ?
        'File not found' :
        `Error while reading .mjmlconfig: ${error}`,
    }

    return { pathStatus: 'invalid', message: 'Couldn’t test mjmlconfig file' }
  }

  checkMjmlConfig = (p) => {
    if (!p) {
      return this.setState({ pathStatus: 'unset' })
    }
    if (this.props.mjmlEngine !== 'auto') {
      return this.setState({ pathStatus: 'customEng' }) // can't check import if custom engine
    }

    if (this.state.pathStatus !== 'checking') {
      this.setState({ pathStatus: 'checking' })
    }
    this.debounceCheckEngine()
  }

  debounceCheckEngine = debounce(async () => {
    const { mjmlConfigPath } = this.state

    if (!mjmlConfigPath) {
      return this.setState({ pathStatus: 'unset' })
    }
    if (this._unmounted) {
      return
    }

    const result = handleMjmlConfig(mjmlConfigPath)

    this.setState(this.formatTestResult(result))
  }, 250)

  debounceSaveSettings = debounce(() => {
    const { mjmlConfigPath } = this.state
    const { updateSettings } = this.props
    updateSettings(settings => {
      return settings.setIn(['mjml', 'mjmlConfigPath'], mjmlConfigPath)
    })
  }, 500)

  render() {
    const { settings } = this.props
    const { mjmlConfigPath, pathStatus, message } = this.state

    return (
      <div className="flow-v-10">
        <div className="mt-10">{'Path of .mjmlconfig file for custom components (slower) :'}</div>
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
        {pathStatus === 'customEng' ? (
          <div className="d-f ai-c c-yellow">
            <IconWarning className="mr-5" />
            {'Cannot test mjmlconfig with custom engine, but it can work anyway. Note that mjml 4.2 or higher is required for handling this.'}
          </div>
        ) : pathStatus === 'checking' ? (
          <div className="d-f ai-c">
            <IconChecking className="mr-5 rotating" />
            {'Checking...'}
          </div>
        ) : pathStatus === 'valid' ? (
          <div className="d-f ai-c c-green">
            <IconCheck className="mr-5" />
            <span dangerouslySetInnerHTML={{__html: message}}/>
          </div>
        ) : pathStatus === 'warning' ? (
          <div className="d-f ai-c c-yellow">
            <IconWarning className="mr-5" />
            <span dangerouslySetInnerHTML={{__html: message}}/>
          </div>
        ) : pathStatus === 'invalid' ? (
          <div className="d-f ai-c c-red">
            <IconError className="mr-5" />
            <span dangerouslySetInnerHTML={{__html: message}}/>
          </div>
        ) : null}
      </div>
    )
  }
}

export default MjmlConfigPath
