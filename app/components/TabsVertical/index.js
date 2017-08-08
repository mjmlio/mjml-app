import React, { PureComponent, Children, createElement } from 'react'
import cx from 'classnames'

import './style.scss'

class TabsVertical extends PureComponent {
  state = {
    index: 0,
  }

  handleSetTab = index => this.setState({ index })

  render() {
    const { children } = this.props

    const { index } = this.state

    const childs = Children.toArray(children)
    const tabToDisplay = childs[index]

    return (
      <div className="TabsVertical sticky">
        <div className="TabsVertical--Tabs">
          {childs.map(({ props: { title, icon } }, i) =>
            <div
              key={title}
              className={cx('TabsVertical--Tab', {
                isActive: i === index,
              })}
              onClick={() => this.handleSetTab(i)}
            >
              {!!icon &&
                createElement(icon, {
                  className: 'mr-10',
                })}
              {title}
            </div>,
          )}
        </div>
        <div className="TabsVertical--View">
          {tabToDisplay}
        </div>
      </div>
    )
  }
}

export class TabItem extends PureComponent {
  render() {
    const { children, className } = this.props

    return (
      <div className={className}>
        {children}
      </div>
    )
  }
}

export default TabsVertical
