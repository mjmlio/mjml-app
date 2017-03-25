const fs = require('fs')
const mjml = require('mjml')
const path = require('path')
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const request = require('request')
const nodeMailjet = require('node-mailjet')

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

  const Mailjet = nodeMailjet.connect(options.apiKey, options.apiSecret)
  const sendEmail = Mailjet.post('send')

  const emailData = {
    FromEmail: options.sender,
    FromName: options.name,
    Subject: 'Test email',
    'Html-part': options.html,
    Recipients: [{ Email: options.to }],
  }

  sendEmail.request(emailData)
    .then(success)
    .catch(error)

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

    /*
     * Disabling that for the moment, because errors
     * occurs to often while typing
     *
    if (res.errors.length) {
      const formattedErrors = res.errors
        .map(e => e.formattedMessage)
        .join('\n')
      return done(formattedErrors)
    }
    */

    done(null, res.html)
  } catch (e) {
    done(e.message)
  }
}
