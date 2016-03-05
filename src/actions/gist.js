
import { remote } from 'electron'
import { notify, error } from '../helpers/notification'

const saved = () => notify('Gist saved! But you will not get the url.')
const notSaved = () => error('Something went wrong')

export const exportAsGist = (content) => () => {

  const createGist = remote.require('./services').createGist
  createGist(content, saved, notSaved)
}
