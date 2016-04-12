/* eslint-disable no-new */

/**
 * Creates an error notification
 *
 * @param {String} message the error message
 * @returns {undefined}
 */
export const error = (message, error) => {
  new Notification(message, {
    title: message,
    body: error
  })
}

/**
 * Creates a notification
 *
 * @param {String} message the notification message
 * @returns {undefined}
 */
export const notify = (message) => {
  new Notification(message)
}

/* eslint-enable no-new */
