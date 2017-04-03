import React, { Component } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Editor from 'components/Editor'
import { makeSnapshot, updateCurrentTemplate, saveTemplate, exportTemplate } from 'actions/templates'
import { updateConfig } from 'actions'
import { exportAsGist } from 'actions/gist'
import Button from 'components/Button'
import EditorSettings from 'components/EditorSettings'
import EditorSend from 'components/EditorSend'
import Mobile from 'components/Mobile'
import Iframe from 'components/Iframe'
import DropDown from 'components/DropDown'
import CopyToClipboard from 'react-copy-to-clipboard'
import beautify from 'js-beautify'

import 'styles/EditorPage.scss'

@connect(
  state => ({
    template: state.templates.getIn(['list', state.templates.get('list').findIndex(
      template => template.get('id') === state.templates.get('current')
    )]),
    config: state.config,
  })
)
class EditorPage extends Component {

  constructor (props) {
    super(props)

    this._template = props.template
    this.state = {
      scroll: 0,
      updateName: false,
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (!prevState.updateName && this.state.updateName) {
      this.refs.editName.focus()
      this.refs.editName.setSelectionRange(0, this.refs.editName.value.length)
    }
  }

  componentWillUnmount () {
    if (this.props.template.get('html') === this._template.get('html')) { return }
    this.props.dispatch(makeSnapshot(this.props.template))
  }

  setScroll = scroll => {
    if (this.props.config.get('editorSyncScroll')) {
      this.setState({ scroll })
    }
  }

  handleChange = (mjml) => {
    this.props.dispatch(updateCurrentTemplate(template => template.set('mjml', mjml)))
      .then(() => this.props.dispatch(saveTemplate()))
  }

  toggleSyncScroll = () => {
    this.props.dispatch(updateConfig(config => config.set('editorSyncScroll', !this.props.config.get('editorSyncScroll'))))
  }

  togglePreview = () => {
    this.props.dispatch(updateConfig(config => config.set('editorShowPreview', !this.props.config.get('editorShowPreview'))))
  }

  renderEmpty () {
    return (
      <div>
        {'No template selected. You should not be here.'}
      </div>
    )
  }

  save = (type) => {
    const { template } = this.props
    if (!template) { return }
    this.props.dispatch(exportTemplate({ template, type }))
  }

  gist = (type) => {
    const { template } = this.props
    if (!template) { return }
    this.props.dispatch(exportAsGist(this.props.template.get(type)))
  }

  home = () => {
    this.props.dispatch(push('/browse/templates'))
  }

  toggleMode = (platform) => () => {
    this.props.dispatch(updateConfig(config => config.set('previewMode', platform)))
  }

  toggleNameEdit = () => {
    this.setState({ updateName: true })
  }

  onNameChange = e => {
    if (e.key === 'Enter') {
      this.validateName(e.target.value)
    }
  }

  validateName = value => {

    value = value.target ? value.target.value : value

    this.setState({ updateName: false })
    if (value.trim() === '') { return }
    this.props.dispatch(updateCurrentTemplate(template => template.set('name', value)))
      .then(() => this.props.dispatch(saveTemplate()))
  }

  render () {
    const { template, config } = this.props
    const { scroll } = this.state

    if (!template) { return this.renderEmpty() }

    const name = template.get('name')
    const mjml = template.get('mjml')

    const editorTheme = config.get('editorTheme')
    const editorShowPreview = config.get('editorShowPreview')
    const previewMode = config.get('previewMode')

    return (
      <div className='EditorPage anim-page'>
        <div className='EditorPage-bar'>

          <Button onClick={this.home} className='EditorPage-bar-item'>
            <i className='ion-android-arrow-back' style={{ marginRight: 0 }} />
          </Button>

          <span className='EditorPage-bar-item' onClick={this.toggleNameEdit}>
              {this.state.updateName
                ? <input
                  ref='editName'
                  className='Tile-input'
                  onBlur={this.validate}
                  defaultValue={name}
                  type='text'
                  onKeyPress={this.onNameChange} />
                : <span className='template-name'>
                    <span>
                      {name}
                    </span>
                  </span>}
          </span>

          <DropDown
            className='EditorPage-bar-item'
            icon='ion-code-download'
            title='Export'>

            <Button onClick={this.save.bind(this, 'html')} className='EditorPage-bar-item'>
              {'HTML'}
            </Button>

            <Button onClick={this.save.bind(this, 'mjml')} className='EditorPage-bar-item'>
              {'MJML'}
            </Button>

          </DropDown>

          <DropDown
            className='EditorPage-bar-item'
            icon='ion-android-clipboard'
            title='Copy'>

            <CopyToClipboard text={beautify.html(this.props.template.get('html'))}>
              <Button className='EditorPage-bar-item'>
               {'HTML'}
              </Button>
            </CopyToClipboard>

            <CopyToClipboard text={this.props.template.get('mjml')}>
              <Button className='EditorPage-bar-item'>
               {'MJML'}
              </Button>
            </CopyToClipboard>

          </DropDown>

          <EditorSettings />

          <div className='EditorPage-bar-side'>
            <Button className={cx('EditorPage-bar-item', { active: editorShowPreview })} onClick={this.togglePreview}>
              <i className='ion-android-image bar-icon' />
              {'Preview'}
            </Button>

            <EditorSend template={template} />

           <DropDown
             className='EditorPage-bar-item'
             icon='ion-social-github bar-icon'
             title='Gist'>

            <Button onClick={this.gist.bind(this, 'html')} className='EditorPage-bar-item'>
              {'HTML'}
            </Button>

            <Button onClick={this.gist.bind(this, 'mjml')} className='EditorPage-bar-item'>
              {'MJML'}
            </Button>

          </DropDown>

          </div>
        </div>

        <div className='EditorPage-view'>

          <div className='EditorPage-panel'>
            <Editor
              value={mjml}
              scroll={scroll}
              onScroll={this.setScroll}
              theme={editorTheme}
              onChange={this.handleChange} />
          </div>

          <div className={cx(`EditorPage-preview platform-${previewMode}`, { show: editorShowPreview })}>
            {previewMode === 'desktop'
              ? <Iframe template={template} scroll={scroll} onScroll={this.setScroll} />
              : <Mobile template={template} scroll={scroll} onScroll={this.setScroll} />}
            <div className={`platform-container platform-${previewMode}`}>
              <Button onClick={this.toggleMode('desktop')} className='platform-button'>
                <i className={cx('ion-android-desktop desktop', { active: previewMode === 'desktop' })}></i>
              </Button>
              <Button onClick={this.toggleMode('mobile')} className='platform-button'>
                <i className={cx('ion-iphone mobile', { active: previewMode === 'mobile' })}></i>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default EditorPage
