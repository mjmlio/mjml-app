const fs = require('fs')
const mjml = require('mjml')
const path = require('path')
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const request = require('request')
const Mailjet = require('node-mailjet')

const dataFolder = process.env.NODE_ENV === 'development'
  ? app.getAppPath()
  : app.getPath('home')

const thumbnailsFolder = path.join(dataFolder, 'mjml-app', 'MJML-thumbnails')

exports.takeSnapshot = (id, html, done) => {

  const winOpts = {
    x: 0,
    y: 0,
    width: 650,
    height: 800,
    show: false,
  }

  const win = new BrowserWindow(winOpts)

  win.loadURL(`data:text/html,${encodeURIComponent(html)}`)

  win.webContents.on('did-finish-load', () => {
    setTimeout(() => {
      win.capturePage(img => {
        win.close()
        const p = path.join(thumbnailsFolder, `${id}.png`)
        fs.writeFile(p, img.toPng(), done)
      })
    }, 500)
  })

}

exports.send = function (options, success, error) {
  new Mailjet(options.apiKey, options.apiSecret)
    .post('send')
    .request({
      FromName: options.name,
      FromEmail: options.sender,
      To: options.to,
      Subject: 'Test Email',
      'Html-Part': options.html,
    }, (err, res) => {
      if (err && err.message) {
        error(err.message)
      } else if (err && err.ErrorMessage) {
        error(err.ErrorMessage)
      } else if (res.statusCode === 401) {
        error('Not Authorized')
      } else if (err) {
        error('There wre a problem while sending your email')
      } else {
        success()
      }
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
          content: content,
          /* eslint-enable object-shorthand */
        },
      },
    }),
  }

  request(options, (err, response, body) => {
    if (err || response.statusCode !== 201) {
      return done(err)
    }
    done(null, JSON.parse(body))
  })
}

/**
 * Generate html from mjml
 */
exports.mjml2html = (mjmlInput, done) => {
  try {
    const res = mjml.mjml2html(mjmlInput)
    if (res.errors.length) {
      const formattedErrors = res.errors
        .map(e => e.formattedMessage)
        .join('\n')
      return done(formattedErrors)
    }
    done(null, res.html)
  } catch (e) {
    done(e.message)
  }
}
