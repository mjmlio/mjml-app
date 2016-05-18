import React, { Component } from 'react'
import { connect } from 'react-redux'

import { usePreset } from 'actions/templates'
import Button from 'components/Button'

@connect()
class TemplateOverlayActions extends Component {

  state = {
    loading: false,
  }

  usePreset = () => {
    const { item } = this.props

    this.setState({ loading: true })
    setTimeout(() => this.props.dispatch(usePreset(item)))
  }

  render () {
    const { loading } = this.state

    return (
      <div className='Overlay-actions'>
        <Button className='success big' onClick={this.usePreset} disabled={loading}>
          {loading
            ? <i style={{ fontSize: 25 }} className='ion-aperture rotating' />
            : <i style={{ fontSize: 25 }} className='ion-ios-copy' />}
        </Button>
      </div>
    )
  }

}

export default TemplateOverlayActions
