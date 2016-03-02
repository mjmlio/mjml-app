const fs = require('fs')
const path = require('path')
const app = require('electron').app
const screenshot = require('electron-screenshot-service')

const Mailjet = require('node-mailjet')

exports.takeSnapshot = function (id, html, done) {
  const url = `data:text/html,${encodeURIComponent(html)}`

  screenshot({
    url,
    width: 650,
    height: 800,
    css: 'body{overflow:hidden}'
  }).then(img => {
    const p = path.join(app.getAppPath(), `./thumbnails/${id}.png`)
    fs.writeFile(p, img.data, done)
  })
  .catch(done)
}

exports.send = function (options, success, error) {
  (new Mailjet(options.mjApiKey, options.mjApiSecret))
    .post('send')
    .request({
      FromName: options.name,
      FromEmail: options.sender,
      To: options.to,
      Subject: 'Test Email',
      'Html-Part': options.html
    })
    .on('success', success)
    .on('error', error)
}
