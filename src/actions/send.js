
import { remote } from 'electron'
import { notify, error } from '../helpers/notification'

const sent = () => notify('Sent!')
const notSent = () => error('Not sent!')

export const send = (html) => (dispatch, getState) => {

  const state = getState()
  const { config } = state
  const mailjet = remote.require('./services').send

  const payload = {
    apiKey: config.get('mjApiKey'),
    apiSecret: config.get('mjApiSecret'),
    name: config.get('userName'),
    sender: config.get('userEmail'),
    to: config.get('sendTo'),
    html,
  }
  mailjet(payload, sent, notSent)
}
