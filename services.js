const fs = require('fs')
const screenshot = require('electron-screenshot-service')

exports.takeSnapshot = function (id, html, done) {
  const url = `data:text/html,${encodeURIComponent(html)}`

  screenshot({
    url,
    width: 650,
    height: 800,
    css: 'body{overflow:hidden}'
  }).then(img => {
    fs.writeFile(`./thumbnails/${id}.png`, img.data, done)
  })
  .catch(done)
}
