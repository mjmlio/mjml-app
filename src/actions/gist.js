
import { remote } from 'electron'
import { notify, error } from '../helpers/notification'

const saved = (response) => notify('Gist saved! Look at the console') || console.log(response.html_url)
const notSaved = (err) => error('Something went wrong')

export const exportAsGist = (content) => dispatch => {
  
  const createGist = remote.require('./services').createGist
  createGist(content, saved, notSaved)
}
