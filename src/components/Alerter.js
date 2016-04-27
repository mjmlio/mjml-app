import React, { Component } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import Transition from 'react-addons-css-transition-group'

import { dismissAlert } from '../actions/alerts'

import '../styles/Alerter.scss'

@connect(
  state => ({ alerts: state.alerts })
)
class Alerter extends Component {

  render () {
    return (
      <Transition
        component='div'
        className='Alerter'
        transitionName='messagesTransition'
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}>

        {this.props.alerts.map(a => (
          <div key={a.get('id')}>
            <div className='Alerter-Alert-wrapper'>
              <div
                className={cx('Alerter-Alert', a.get('level'))}
                onClick={() => this.props.dispatch(dismissAlert(a))}>
                {a.get('message')}
              </div>
            </div>
          </div>
        ))}

      </Transition>
    )
  }

}

export default Alerter
