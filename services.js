const fs = require('fs')
const path = require('path')
const app = require('electron').app
const screenshot = require('electron-screenshot-service')

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
