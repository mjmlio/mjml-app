import { remote, shell } from 'electron'

export const exportAsGist = (content) => () => {

  const createGist = remote.require('./services').createGist
  createGist(content, (err, body) => {
    if (err) { return }
    shell.openExternal(body.html_url)
  })
}
