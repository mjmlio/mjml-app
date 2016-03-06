import React, { Component } from 'react'
import { connect } from 'react-redux'

import { createNewTemplate } from '../../actions/templates'
import TileGrid from '../TileGrid'
import Button from '../Button'

@connect(
  state => ({
    templates: state.templates.get('list')
  })
)
class BrowseRecent extends Component {

  createNew = () => {
    this.props.dispatch(createNewTemplate())
  }

  render () {
    const { templates } = this.props

    return (
      <div>
        {!!templates.size
          ? <TileGrid items={templates} />
          : (
            <div className='BlankPlaceholder anim-bounce'>
              <h1 className='anim-fadeInUp' style={{ marginBottom: 40 }}>
                {'You have no templates.'}
              </h1>
              <Button className='primary anim-fadeInDelayed' onClick={this.createNew}>
                {'Create your first template!'}
              </Button>
            </div>
          )}
      </div>
    )
  }

}

export default BrowseRecent
