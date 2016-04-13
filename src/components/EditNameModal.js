import React, { Component } from 'react'
import { connect } from 'react-redux'

import Modal from './Modal'
import { doUpdateTemplate, saveTemplateWithId } from '../actions/templates'

@connect()
class EditNameModal extends Component {

  saveName = e => {
    e.preventDefault()
    const { item, dispatch, onClose } = this.props
    const newTemplateName = this.refs.tplName.value
    const id = item.get('id')
    dispatch(doUpdateTemplate({ id, updater: t => t.set('name', newTemplateName) }))
    dispatch(saveTemplateWithId(id))
    onClose()
  }

  render () {
    const { item, isOpened, onClose } = this.props

    return (
      <Modal isOpened={isOpened} onClose={onClose}>
        <form onSubmit={this.saveName}>
          <div className='form-group'>
            <input
              ref='tplName'
              type='text'
              defaultValue={item.get('name')}
              required />
          </div>
          <div className='form-group'>
            <button type='submit' className='Button primary'>
              {'Save'}
            </button>
          </div>
        </form>
      </Modal>
    )
  }

}

export default EditNameModal
