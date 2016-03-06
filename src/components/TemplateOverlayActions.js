import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loadTemplate, deleteTemplate, doUpdateTemplate, saveTemplateWithId } from '../actions/templates'
import Button from './Button'
import Modal from './Modal'

@connect()
class TemplateOverlayActions extends Component {

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
    const { item } = this.props
    const newTemplateName = this.refs.tplName.value
    const id = item.get('id')
    this.props.dispatch(doUpdateTemplate({
      id,
      updater: t => t.set('name', newTemplateName)
    }))
    this.props.dispatch(saveTemplateWithId(id))
    this.hideEditNameModal()
  }

  render () {
    const { editNameModal } = this.state
    const { item } = this.props

    return (
      <div className='Overlay-actions'>
        <Button className='primary' onClick={this.showEditNameModal}>
          <i className='ion-pricetag' />
        </Button>

        <Button className='primary big' onClick={this.loadTemplate(item)}>
          <i className='ion-edit' />
        </Button>

        <Button className='danger' onClick={this.deleteTemplate(item)}>
          <i className='ion-trash-b' />
        </Button>

        <Modal isOpened={editNameModal} onClose={this.hideEditNameModal}>
          <form onSubmit={this.saveName}>
            <input ref='tplName' type='text' defaultValue={item.get('name')} />
            <button type='submit' className='Button primary'>
              {'Save'}
            </button>
          </form>
        </Modal>
      </div>
    )
  }

}

export default TemplateOverlayActions
