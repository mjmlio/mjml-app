
import { remote } from 'electron'
import { notify, error } from '../helpers/notification'

const sent = () => notify('Sent!')
const notSent = () => error('Not sent!')

export const send = (html) => (dispatch, getState) => {

  const state = getState()
  const { config } = state
  const mailjet = remote.require('./services').send

  mailjet({
    apiKey: config.get('mjApiKey'),
    apiSecret: config.get('mjApiSecret'),
    name: config.get('userName'),
    sender: config.get('userEmail'),
<<<<<<< HEAD
    to: 'gbadi@mailjet.com',
    html: html
=======
    to: config.get('userEmail'),
    html
>>>>>>> c067597d4889892c8fed61b130ad90a892d3d64d
  }, sent, notSent)
}
