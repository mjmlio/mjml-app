
import React, { Component } from 'react'

import 'styles/Feature.scss'

class Feature extends Component {

  render () {
    const { content, onNext } = this.props

    return (
      <div className='Features-item'>
        <div className='Feature-description'>
          <span className='heading'>FEATURES</span>
          <h3>
            {content.title}
          </h3>
          <section>
            {content.desc}
          </section>
        </div>
        <div className='image'>
          <img src={content.img} onClick={onNext} />
        </div>
      </div>
    )
  }
}

export default Feature
