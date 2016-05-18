import { remote, shell } from 'electron'

/**
 * Creates a anonymous gist file and open it in the browser
 *
 * @param {String} content
 */
export const exportAsGist = content => () => {

  const createGist = remote.require('./services').createGist
  createGist(content, (err, body) => {
    if (err) { return }
    shell.openExternal(body.html_url)
  })
}
