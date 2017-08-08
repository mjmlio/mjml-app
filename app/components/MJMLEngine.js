import fs from 'fs'
import React, { Component } from 'react'
import debounce from 'lodash/debounce'
import { connect } from 'react-redux'

import IconCheck from 'react-icons/md/check-circle'
import IconChecking from 'react-icons/md/autorenew'
import IconError from 'react-icons/md/error'
import IconWarning from 'react-icons/md/warning'

import { exec, fileDialog, fsAccess } from 'helpers/fs'

import { updateSettings } from 'actions/settings'

import Button from 'components/Button'
import RadioGroup from 'components/RadioGroup'
import Radio from 'components/RadioGroup/Radio'

export async function getMJMLVersion(location) {
  try {
    await fsAccess(location, fs.constants.R_OK | fs.constants.R_OK | fs.constants.X_OK)
    const { err, stdout } = await exec(`${location} --version`)
    if (err) {
      return null
    }
    const version = stdout.trim()
    return version
  } catch (e) {
    return null
  }
}

@connect(
  state => {
    const { settings } = state
    return {
      mjmlEngine: settings.getIn(['mjml', 'engine'], 'auto'),
      mjmlPath: settings.getIn(['mjml', 'path'], ''),
    }
  },
  {
    updateSettings,
  },
)
class MJMLEngine extends Component {
  state = {
    mjmlEngine: 'auto',
    mjmlPath: '',
    // unset / checking / valid / invalid
    pathStatus: 'unset',
    // mjml version of local mjml
    mjmlVersion: null,
  }

  componentWillMount() {
    const { mjmlEngine, mjmlPath } = this.props
    this.setState({
      mjmlEngine,
      mjmlPath,
      pathStatus: mjmlPath ? 'checking' : 'unset',
    })
  }

  componentDidMount() {
    if (this.state.mjmlPath) {
      window.requestIdleCallback(() => {
        this.checkEngine()
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.mjmlEngine === 'auto' && this.state.mjmlEngine === 'manual') {
      if (this.state.pathStatus === 'checking') {
        window.requestIdleCallback(this.checkEngine)
      }
    }
  }

  componentWillUnmount() {
    this._unmounted = true
  }

  handleChangeEngine = mjmlEngine => {
    this.setState({ mjmlEngine })
    this.debounceSaveSettings()
  }

  handleChangeMJMLPath = p => {
    if (!p) {
      return this.setState({ pathStatus: 'unset', mjmlPath: '' })
    }
    this.setState({ mjmlPath: p })
    this.checkEngine()
    this.debounceSaveSettings()
  }

  handleBrowse = () => {
    const p = fileDialog({
      properties: ['openFile'],
    })
    if (!p) {
      return
    }
    this.handleChangeMJMLPath(p)
  }

  assignProps = ({ mjmlPath, mjmlEngine }) =>
    this.setState({
      mjmlPath,
      mjmlEngine,
      pathStatus: mjmlPath ? 'checking' : 'unset',
    })

  checkEngine = () => {
    if (this.state.pathStatus !== 'checking') {
      this.setState({ pathStatus: 'checking' })
    }
    this.debounceCheckEngine()
  }

  debounceCheckEngine = debounce(async () => {
    const { mjmlPath } = this.state
    if (!mjmlPath) {
      return this.setState({ pathStatus: 'unset' })
    }
    const version = await getMJMLVersion(mjmlPath)
    if (this._unmounted) {
      return
    }
    this.setState({
      pathStatus: version ? 'valid' : 'invalid',
      mjmlVersion: version,
    })
  }, 250)

  debounceSaveSettings = debounce(() => {
    const { mjmlPath, mjmlEngine } = this.state
    const { updateSettings } = this.props
    updateSettings(settings => {
      return settings.setIn(['mjml', 'path'], mjmlPath).setIn(['mjml', 'engine'], mjmlEngine)
    })
  }, 500)

  render() {
    const { mjmlEngine, mjmlPath, mjmlVersion, pathStatus } = this.state

    return (
      <RadioGroup value={mjmlEngine} onChange={this.handleChangeEngine}>
        <Radio value="auto">
          {`Use the embedded MJML engine (v${__MJML_VERSION__})`}
        </Radio>
        <Radio value="manual">
          <div className="flow-v-10">
            <div>
              {'Use a custom MJML engine (slower)'}
            </div>
            {mjmlEngine === 'manual' &&
              <div className="flow-v-10">
                <div className="d-f ai-s fg-1">
                  <input
                    autoFocus
                    className="fg-1"
                    value={mjmlPath}
                    onChange={e => this.handleChangeMJMLPath(e.target.value)}
                    placeholder="MJML path"
                    type="text"
                  />
                  <Button ghost onClick={this.handleBrowse} type="button">
                    {'Browse'}
                  </Button>
                </div>
                {pathStatus === 'unset'
                  ? <div className="d-f ai-c c-yellow">
                      <IconWarning className="mr-5" />
                      {'No engine set'}
                    </div>
                  : pathStatus === 'checking'
                    ? <div className="d-f ai-c">
                        <IconChecking className="mr-5 rotating" />
                        {'Checking...'}
                      </div>
                    : pathStatus === 'valid'
                      ? <div className="d-f ai-c c-green">
                          <IconCheck className="mr-5" />
                          {`MJML ${mjmlVersion} located successfully`}
                        </div>
                      : pathStatus === 'invalid'
                        ? <div className="d-f ai-c c-red">
                            <IconError className="mr-5" />
                            {'MJML not found at this location'}
                          </div>
                        : null}
              </div>}
          </div>
        </Radio>
      </RadioGroup>
    )
  }
}

export default MJMLEngine
