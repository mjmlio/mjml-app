
import { remote } from 'electron'
import { notify, error } from '../helpers/notification'

const sent = () => notify('Sent')
const notSent = () => error('Not Sent')

export const send = (html) => (dispatch, getState) => {

  const state = getState()
  const { config } = state
  const mailjet = remote.require('./services').send

  mailjet({
    apiKey: config.get('mjApiKey'),
    apiSecret: config.get('mjApiSecret'),
    name: config.get('userName'),
    sender: config.get('userEmail'),
    to: config.get('userEmail'),
    html
  }, sent, notSent)
}
