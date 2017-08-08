import React, { Component } from 'react'
import debounce from 'lodash/debounce'
import isObject from 'lodash/isObject'
import { bindActionCreators } from 'redux'
import os from 'os'
import path from 'path'
import { connect } from 'react-redux'
import IconArrowRight from 'react-icons/md/arrow-forward'
import IconArrowLeft from 'react-icons/md/arrow-back'
import IconCheck from 'react-icons/md/check-circle'
import IconChecking from 'react-icons/md/autorenew'
import IconError from 'react-icons/md/error'

import * as templates from 'templates'

import { fileDialog, isEmptyOrDontExist, alreadyExists } from 'helpers/fs'

import Modal from 'components/Modal'
import Button from 'components/Button'

import TemplateChooser from './TemplateChooser'

import { isModalOpened, closeModal } from 'reducers/modals'

import createFromTemplate from 'actions/createFromTemplate'
import createFromGallery from 'actions/createFromGallery'
import { saveLastOpenedFolder } from 'actions/settings'

import './style.scss'

const HOME_DIR = os.homedir()

const defaultState = {
  projectName: '',
  projectLocation: HOME_DIR,
  // unset / checking / valid / invalid
  projectLocStatus: 'unset',
  // name / template
  step: 'name',
  template: 'singleBasic',
  isCreating: false,
}

@connect(
  state => ({
    isOpened: isModalOpened(state, 'newProject'),
    lastOpenedFolder: state.settings.get('lastOpenedFolder'),
  }),
  dispatch => ({
    closeModal: () => dispatch(closeModal('newProject')),
    ...bindActionCreators(
      {
        createFromTemplate,
        createFromGallery,
        saveLastOpenedFolder,
      },
      dispatch,
    ),
  }),
)
class NewProjectModal extends Component {
  state = defaultState

  componentWillReceiveProps(nextProps) {
    if (!this.props.isOpened && nextProps.isOpened) {
      this.setState({
        projectLocation: this.props.lastOpenedFolder || HOME_DIR,
      })
    }
    if (this.props.isOpened && !nextProps.isOpened) {
      // prevent flashing the resetted content
      // while animating :D
      setTimeout(() => {
        if (!this.props.isOpened) {
          this.setState(defaultState)
        }
      }, 300)
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isOpened && this.props.isOpened) {
      this._inputName && this._inputName.focus()
    }
  }

  handleSubmit = e => {
    e.preventDefault()
  }

  handleBrowse = () => {
    const { lastOpenedFolder } = this.props
    const p = fileDialog({
      defaultPath: lastOpenedFolder || undefined,
      properties: ['openDirectory', 'createDirectory'],
    })
    if (!p) {
      return
    }
    this.setState({ projectLocation: p })
  }

  handleNext = async () => {
    const { projectName, projectLocation, step } = this.state

    const { createFromTemplate, createFromGallery, closeModal, saveLastOpenedFolder } = this.props

    if (step === 'name') {
      this.setState({ step: 'template' })
    }

    if (step === 'template') {
      const fullPath =
        projectName && projectLocation ? path.join(projectLocation, projectName) : null

      // handle from gallery
      if (isObject(this.state.template)) {
        const MJMLContentRes = await fetch(this.state.template.mjml)
        const MJMLContent = await MJMLContentRes.text()
        this.setState({ isCreating: true })
        await createFromGallery(fullPath, MJMLContent)
        this.setState({ isCreating: false })
      } else {
        // handle from our own templates
        await createFromTemplate(fullPath, templates[this.state.template])
        saveLastOpenedFolder(projectLocation)
      }

      closeModal()
    }
  }

  handlePrev = () => {
    if (this.state.step === 'template') {
      this.setState({ step: 'name' })
    }
  }

  handleSelectTemplate = template => this.setState({ template })

  handleChangeName = e => {
    const { value } = e.target
    this.setState({
      projectName: value,
      projectLocStatus: value ? 'checking' : 'unset',
    })
    if (value) {
      this.debounceCheckName()
    }
  }

  handleChangeProjectLocation = v => {
    this.setState({
      projectLocation: v,
      projectLocStatus: 'checking',
    })
    this.debounceCheckName()
  }

  debounceCheckName = debounce(async () => {
    const { projectLocation, projectName } = this.state
    if (!projectName) {
      this.setState({
        projectLocStatus: 'unset',
      })
      return
    }
    const full = path.join(projectLocation, projectName)
    const locOK = await isEmptyOrDontExist(full)
    const parentOK = await alreadyExists(projectLocation)
    this.setState({
      projectLocStatus: parentOK ? (locOK ? 'valid' : 'invalid') : 'parent-invalid',
    })
  }, 250)

  render() {
    const { isOpened, closeModal } = this.props

    const {
      projectName,
      projectLocation,
      projectLocStatus,
      step,
      template,
      isCreating,
    } = this.state

    const fullPath = projectName && projectLocation ? path.join(projectLocation, projectName) : null

    return (
      <Modal
        className="NewProjectModal"
        isOpened={isOpened}
        onClose={closeModal}
        style={{
          width: step === 'template' ? 800 : undefined,
        }}
      >
        <form onSubmit={this.handleSubmit}>
          <div className="Modal--label">
            {step === 'name' ? 'New project' : 'Choose a template to start with'}
          </div>

          {step === 'name'
            ? <div className="flow-v-20">
                <div className="d-f ai-b">
                  <div style={{ width: 150 }} className="fs-0">
                    {'Project name:'}
                  </div>
                  <input
                    ref={n => (this._inputName = n)}
                    className="fg-1"
                    value={projectName}
                    onChange={this.handleChangeName}
                    placeholder="Project name"
                    type="text"
                    autoFocus
                  />
                </div>

                <div className="d-f ai-b">
                  <div style={{ width: 150 }} className="fs-0">
                    {'Location:'}
                  </div>
                  <div className="fg-1">
                    <div className="d-f ai-s fg-1">
                      <input
                        className="fg-1"
                        value={projectLocation}
                        onChange={e => this.handleChangeProjectLocation(e.target.value)}
                        placeholder="Location"
                        type="text"
                      />
                      <Button ghost onClick={this.handleBrowse} type="button">
                        {'Browse'}
                      </Button>
                    </div>
                    {fullPath &&
                      <div className="mt-10 t-small">
                        {'Project will be created at: '}
                        <b className="c-white wb-ba">
                          {fullPath}
                        </b>
                      </div>}
                    {projectLocStatus === 'checking' &&
                      <div className="t-small mt-10">
                        <IconChecking className="rotating mr-5" />
                        {'Checking...'}
                      </div>}
                    {projectLocStatus === 'valid' &&
                      <div className="t-small mt-10 c-green">
                        <IconCheck className="mr-5" />
                        {'Location is OK'}
                      </div>}
                    {projectLocStatus === 'parent-invalid' &&
                      <div className="t-small mt-10 c-red">
                        <IconError className="mr-5" />
                        {"Parent directory does't exist"}
                      </div>}
                    {projectLocStatus === 'invalid' &&
                      <div className="t-small mt-10 c-red">
                        <IconError className="mr-5" />
                        {'Directory exists and is not empty'}
                      </div>}
                  </div>
                </div>
              </div>
            : step === 'template'
              ? <TemplateChooser template={template} onSelect={this.handleSelectTemplate} />
              : null}

          <div className="ModalFooter">
            <Button
              disabled={
                (step === 'name' &&
                  (!projectName || !projectLocation || projectLocStatus !== 'valid')) ||
                (step === 'template' && !template) ||
                isCreating
              }
              primary
              onClick={this.handleNext}
            >
              {step === 'name'
                ? <div className="d-f ai-c">
                    {'Choose template'}
                    <IconArrowRight className="ml-10" />
                  </div>
                : step === 'template'
                  ? <div className="d-f">
                      <IconCheck className="mr-5" />
                      {'Create'}
                    </div>
                  : null}
            </Button>
            {step === 'template' &&
              <Button ghost onClick={this.handlePrev}>
                <IconArrowLeft className="mr-10" />
                {'Choose location and name'}
              </Button>}
            <Button transparent onClick={closeModal}>
              {'Cancel'}
            </Button>
          </div>
        </form>
      </Modal>
    )
  }
}

export default NewProjectModal
