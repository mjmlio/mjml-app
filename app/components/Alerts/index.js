import React, { Component } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import Steack from 'react-steack'

import { removeAlert } from 'reducers/alerts'

import './style.scss'

@connect(state => ({
  alerts: state.alerts,
}), {
  removeAlert,
})
class Alerts extends Component {

  render () {

    const {
      alerts,
      removeAlert,
    } = this.props

    return (
      <div className='Alerts'>
        <Steack reverse>
          {alerts.map(a => (
            <div
              key={a.id}
              onClick={() => removeAlert(a.id)}
              className={cx('Alerts--item', a.type)}
            >
              {a.message}
            </div>
          ))}
        </Steack>
      </div>
    )
  }

}

export default Alerts
