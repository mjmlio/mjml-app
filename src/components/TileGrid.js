
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
        <span className='template-info'>Untitled</span>
      </div>
    )
  }

  render () {
    const { templates, limit } = this.props

    const tps = limit ? templates.slice(0, limit) : templates

    return (
      <div className='TileGrid'>
        <ScrollArea className='TileGrid-abs anim-sub-page'>
          <div className='TileGrid-wrapper'>
            {tps.map(this.renderTemplate)}
          </div>
        </ScrollArea>
      </div>
    )
  }
}

export default TileGrid
