import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import TemplateOverlayActions from '../TemplateOverlayActions'
import { createNewTemplate } from '../../actions/templates'
import TileGrid from '../TileGrid'
import Button from '../Button'

@connect(
  state => ({
    templates: state.templates.get('list'),
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
          ? <TileGrid
            canEditName
            overlayActions={TemplateOverlayActions}
            items={templates} />
          : (
            <div className='BlankPlaceholder anim-bounce'>
              <h1 className='anim-fadeInUp' style={{ marginBottom: 40 }}>
                {'You have no templates.'}
              </h1>
              <div className='anim-fadeInDelayed'>
                <Button className='primary' onClick={this.createNew}>
                  {'Create one from scrath!'}
                </Button>
                <span style={{ margin: 15 }}>
                  {' or '}
                </span>
                <Link to='/browse/presets'>
                  {'browse presets'}
                </Link>
              </div>
            </div>
          )}
      </div>
    )
  }

}

export default BrowseRecent
