import React, { Component } from 'react'
import { connect } from 'react-redux'
import IconClose from 'react-icons/md/close'
import IconCheck from 'react-icons/md/check-circle'

import { isModalOpened, closeModal } from 'reducers/modals'
import { removeNotif } from 'reducers/notifs'

import Panel from 'components/Panel'
import Button from 'components/Button'

@connect(
  state => ({
    notifs: state.notifs,
    isOpened: isModalOpened(state, 'notifs'),
  }),
  {
    closeModal,
    removeNotif,
  },
)
class NotifsPanel extends Component {
  handleClose = () => this.props.closeModal('notifs')

  render() {
    const { isOpened, notifs, removeNotif } = this.props

    return (
      <Panel isOpened={isOpened} onClose={this.handleClose} className="p-10 d-f fd-c flow-v-10">
        <div className="d-f ai-c fs-0">
          <h2>
            {'Notifications'}
          </h2>
          <Button transparent onClick={this.handleClose} className="ml-auto">
            <IconClose />
          </Button>
        </div>
        <div className="fg-1 r">
          <div className="sticky o-y-a d-f fd-c">
            {notifs.size
              ? <div className="flow-v-20">
                  {notifs.map(n =>
                    <div key={n.get('id')} className="Notif">
                      <Button className="Notif-hide a" onClick={() => removeNotif(n.get('id'))}>
                        {'hide'}
                      </Button>
                      {n.get('content')}
                    </div>,
                  )}
                </div>
              : <div className="fg-1 z">
                  <IconCheck size={100} className="mb-20" />
                  <div className="mb-20">
                    {'No new notifications.'}
                  </div>
                  <Button ghost onClick={this.handleClose}>
                    {'Close panel'}
                  </Button>
                </div>}
          </div>
        </div>
      </Panel>
    )
  }
}

export default NotifsPanel
