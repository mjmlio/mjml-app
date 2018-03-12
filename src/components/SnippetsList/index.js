import React, { Component } from 'react'
import { connect } from 'react-redux'

import './style.scss'

import SnippetItem from './SnippetItem'

@connect(state => ({
  settings: state.settings,
}))
class SnippetsList extends Component {
  render() {
    const { settings } = this.props
    const snippets = settings.get('snippets')

    return (
      <div className="fg-1 d-b">
        {snippets.map(s => {
          return (
            <SnippetItem
              key={s.name}
              className="SnippetItem"
              name={s.name}
              trigger={s.trigger}
              content={s.content}
            />
          )
        })}
      </div>
    )
  }
}

export default SnippetsList
