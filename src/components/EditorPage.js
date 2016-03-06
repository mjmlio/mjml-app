import React, { Component } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Editor from './Editor'
import { makeSnapshot, updateCurrentTemplate, saveTemplate, exportTemplate } from '../actions/templates'
import { updateConfig } from '../actions'
import { exportAsGist } from '../actions/gist'
import Button from './Button'
import EditorSettings from './EditorSettings'
import EditorSend from './EditorSend'
import Mobile from './Mobile'
import Desktop from './Desktop'
import DropDown from './DropDown'

import '../styles/EditorPage.scss'

@connect(
  state => ({
    template: state.templates.getIn(['list', state.templates.get('list').findIndex(
      template => template.get('id') === state.templates.get('current')
    )]),
    config: state.config
  })
)
class EditorPage extends Component {

  constructor (props) {
    super(props)

    this._template = props.template
  }

  componentWillUnmount () {
    if (this.props.template.get('html') === this._template.get('html')) { return }
    this.props.dispatch(makeSnapshot(this.props.template))
  }

  handleChange = (mjml) => {
    this.props.dispatch(updateCurrentTemplate(template => template.set('mjml', mjml)))
    this.props.dispatch(saveTemplate())
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

  gist = () => {
    this.props.dispatch(exportAsGist(this.props.template.get('mjml')))
  }

  home = () => {
    this.props.dispatch(push('/browse/templates'))
  }

  toggleMode = (platform) => () => {
    this.props.dispatch(updateConfig(config => config.set('previewMode', platform)))
  }

  render () {
    const { template, config } = this.props

    if (!template) { return this.renderEmpty() }

    const mjml = template.get('mjml')

    const editorTheme = config.get('editorTheme')
    const editorShowPreview = config.get('editorShowPreview')
    const previewMode = config.get('previewMode')

    return (
      <div className='EditorPage anim-page'>
        <div className='EditorPage-bar'>

          <Button onClick={this.home} className='EditorPage-bar-item'>
            <i className='ion-android-arrow-back' />
          </Button>

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

          <EditorSettings />

          <div className='EditorPage-bar-side'>
            <Button className={cx('EditorPage-bar-item', { active: editorShowPreview })} onClick={this.togglePreview}>
              <i className='ion-android-image bar-icon' />
              {'Preview'}
            </Button>

            <EditorSend template={template} />

            <Button className='EditorPage-bar-item' onClick={this.gist}>
              <i className='ion-social-github bar-icon' />
              {'Gist'}
            </Button>
          </div>
        </div>

        <div className='EditorPage-view'>

          <div className='EditorPage-panel'>
            <Editor
              value={mjml}
              theme={editorTheme}
              onChange={this.handleChange} />
          </div>

          <div className={cx(`EditorPage-preview platform-${previewMode}`, { show: editorShowPreview })}>
            {previewMode === 'desktop' ? <Desktop /> : <Mobile />}
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
