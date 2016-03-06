
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loadTemplate, deleteTemplate, doUpdateTemplate, saveTemplateWithId } from '../actions/templates'

import Button from './Button'
import Modal from './Modal'

import '../styles/Overlay.scss'

@connect()
class Overlay extends Component {

  state = {
    editNameModal: false
  }

  showEditNameModal = () => this.setState({ editNameModal: true })
  hideEditNameModal = () => this.setState({ editNameModal: false })

  loadTemplate = template => () => {
    this.props.dispatch(loadTemplate(template))
  }

  deleteTemplate = template => () => {
    this.props.dispatch(deleteTemplate(template))
  }

  saveName = e => {
    e.preventDefault()
    const { template } = this.props
    const newTemplateName = this.refs.tplName.value
    const id = template.get('id')
    this.props.dispatch(doUpdateTemplate({
      id,
      updater: t => t.set('name', newTemplateName)
    }))
    this.props.dispatch(saveTemplateWithId(id))
    this.hideEditNameModal()
  }

  renderOverlay (template) {
    const { editNameModal } = this.state

    return (
      <div className='overlay'>
        <Button className='primary' onClick={this.showEditNameModal}>
          <i className='ion-pricetag' />
        </Button>

        <Button className='primary open' onClick={this.loadTemplate(template)}>
          <i className='ion-edit' />
        </Button>

        <Button className='danger' onClick={this.deleteTemplate(template)}>
          <i className='ion-trash-b' />
        </Button>

        <Modal isOpened={editNameModal} onClose={this.hideEditNameModal}>
          <form onSubmit={this.saveName}>
            <input ref='tplName' type='text' defaultValue={template.get('name')} />
            <button type='submit' className='Button primary'>
              {'Save'}
            </button>
          </form>
        </Modal>
      </div>
    )
  }

  render () {
    const { visible, template } = this.props
    const { editNameModal } = this.state

    return (
      <div>
        {(visible || editNameModal) && this.renderOverlay(template)}
      </div>
    )
  }
}

export default Overlay
