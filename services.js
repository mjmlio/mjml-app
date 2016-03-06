const fs = require('fs')
const path = require('path')
const app = require('electron').app
const screenshot = require('electron-screenshot-service')
const request = require('request')

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
  new Mailjet(options.apiKey, options.apiSecret)
    .post('send')
    .request({
      FromName: options.name,
      FromEmail: options.sender,
      To: options.to,
      Subject: 'Test Email',
      'Html-Part': options.html
    }, (err, response) => {
      return (err || response.statusCode !== 200)
        ? error(err)
        : success()
    })
}

exports.createGist = function (content, done) {
  const options = {
    url: 'https://api.github.com/gists',
    method: 'POST',
    headers: { 'user-agent': 'MJML App' },
    body: JSON.stringify({
      description: 'Made with MJML App',
      // a voir
      public: true,
      files: {
        'email.mjml': {
          /* eslint-disable object-shorthand */
          content: content
          /* eslint-enable object-shorthand */
        }
      }
    })
  }

  request(options, (err, response, body) => {
    if (err || response.statusCode !== 201) {
      return done(err)
    }
    done(null, JSON.parse(body))
  })
}
