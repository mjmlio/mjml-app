import storage from 'electron-json-storage'
import defaults from 'lodash/defaults'

export default () => new Promise((resolve, reject) => {
  storage.get('settings', (err, res) => {
    if (err) { return reject(err) }
    const settings = defaults(res, {
      projects: [],
    })
    resolve(settings)
  })
})
