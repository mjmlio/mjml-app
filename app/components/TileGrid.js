
import React, { Component } from 'react'
import { connect } from 'react-redux'
import ScrollArea from 'react-scrollbar'

import Thumbnail from './Thumbnail'
import { loadTemplate } from '../actions/templates'

import '../styles/TileGrid.scss'

@connect(
  state => ({
    templates: state.templates.get('list')
  })
)
class TileGrid extends Component {

  loadTemplate = template => {
    this.props.dispatch(loadTemplate(template))
  }

  renderTemplate = (template) => {

    return (
      <div className='template' key={template.get('id')} onClick={this.loadTemplate.bind(this, template)}>
        <div className='template-wrapper'>
          <Thumbnail template={template} />
        </div>
      </div>
    )
  }

  render () {
    const { templates } = this.props

    return (
      <div className='TileGrid'>
        <ScrollArea className='TileGrid-abs'>
          <div className='TileGrid-wrapper'>
            {templates.map(this.renderTemplate)}
          </div>
        </ScrollArea>
      </div>
    )
  }
}

export default TileGrid
