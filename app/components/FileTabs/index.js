import React, { Component } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import IconClose from 'react-icons/md/close'

import Tabbable from 'components/Tabbable'

import { focusTab, closeTab } from 'reducers/tabs'

import './style.scss'

@connect(
  state => ({
    tabs: state.tabs,
  }),
  {
    focusTab,
    closeTab,
  },
)
class FileTabs extends Component {
  render() {
    const { tabs, focusTab, closeTab } = this.props

    return (
      <div className="FileTabs">
        {tabs.map(t => {
          const isFocused = t.get('isFocused')
          return (
            <Tabbable
              className={cx('FileTab', {
                isActive: isFocused,
              })}
              onClick={isFocused ? undefined : () => focusTab(t.get('path'))}
              key={t.get('path')}
            >
              <div className="ellipsis">
                {t.get('name')}
              </div>
              <Tabbable className="FileTab--close-icon" onClick={() => closeTab(t.get('path'))}>
                <IconClose />
              </Tabbable>
            </Tabbable>
          )
        })}
      </div>
    )
  }
}

export default FileTabs
