import React, { Component } from 'react'
import Portal from 'react-portal'
import cx from 'classnames'
import { connect } from 'react-redux'
import Steack from 'react-steack'
import IconError from 'react-icons/md/error'

import { removeAlert } from 'reducers/alerts'

import './style.scss'

@connect(
  state => ({
    alerts: state.alerts,
  }),
  {
    removeAlert,
  },
)
class Alerts extends Component {
  render() {
    const { alerts, removeAlert } = this.props

    return (
      <Portal isOpened>
        <div className="Alerts">
          <Steack reverse>
            {alerts.map(a =>
              <div
                key={a.id}
                onClick={() => removeAlert(a.id)}
                className={cx('Alerts--item', a.type)}
              >
                {a.type === 'error' && <IconError className="mr-10" size={30} />}
                {a.message}
              </div>,
            )}
          </Steack>
        </div>
      </Portal>
    )
  }
}

export default Alerts
