import React, { Component } from 'react'
import { connect } from 'react-redux'

import './style.scss'

import SnippetItem from './SnippetItem'

export default connect(state => ({
  settings: state.settings,
}))(
  class SnippetsList extends Component {
    state = {
      filter: ''
    }
    
    render() {
      const { settings } = this.props
      const { filter } = this.state
      const snippets = settings.get('snippets')
      const snippetsFiltered = !filter ? snippets : snippets.filter(s => s.name.includes(filter))

      return (
        <div className="fg-1 d-b">
          <div className="mb-20">
            <input
              className="fg-1"
              onChange={e => this.setState({ filter: e.target.value })}
              placeholder="Filter by name"
              value={filter}
              type="text"
            />
          </div>
          <div>
            {snippetsFiltered.map(s => {
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
        </div>
      )
    }
  },
)
