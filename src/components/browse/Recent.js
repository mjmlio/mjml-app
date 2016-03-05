import React, { Component } from 'react'
import { connect } from 'react-redux'

import TileGrid from '../TileGrid'

@connect(
  state => ({
    templates: state.templates.get('list')
  })
)
class BrowseRecent extends Component {

  render () {
    const { templates } = this.props

    return (
      <div>
        {!!templates.size
          ? <TileGrid items={templates} />
          : (
            <div className='BlankPlaceholder anim-bounce'>
              <h1 className='anim-fadeInUp'>
                {'No templates availables!'}
              </h1>
            </div>
          )}
      </div>
    )
  }

}

export default BrowseRecent
