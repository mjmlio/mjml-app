import React, { Component } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'

import { updateSettings } from 'actions/settings'

@connect(
  state => ({
    snippets: state.settings.getIn(['snippets', '']),
  }),
  {
    updateSettings,
  },
  null,
  { withRef: true },
)

class SnippetsList extends Component {
  state = {
    snippets: [],
  }

  render() {
    const { snippets } = this.state

    return (
      <div className="fg-1 d-b fd-c">
        {snippets.map(s => {
          <div key={s.name}>
            <div>
              <div>{s.name}</div>
            </div>
          </div>
        }
        )}
      </div>
    )
  }
}

export default SnippetsList
