import { remote } from 'electron'

import { notify, error } from 'helpers/notification'

const sent = () => notify('Sent!')
const notSent = e => error('Not sent!', e)

/**
 * Sends a test email using the mailjet api
 *
 * @param {String} html html email content
 * @param {Function} dispatch store.dispatch function
 * @param {Function} returns the store state
 */
export const send = html => (dispatch, getState) => {

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
