import { remote } from 'electron'

export default async function takeScreenshot (html, deviceWidth) {
  return new Promise(resolve => {
    const win = new remote.BrowserWindow({
      width: deviceWidth,
      show: false,
    })

    win.loadURL(`data:text/html, ${html}`)

    win.webContents.on('did-finish-load', () => {
      // Window is not fully loaded after this event, hence setTimeout()...
      win.webContents.executeJavaScript('document.querySelector(\'body\').getBoundingClientRect().height', (height) => {
        win.setSize(deviceWidth, height)
        setTimeout(() => {
          win.webContents.capturePage((img) => { // eslint-disable-line
            win.close()
            resolve(img.toPng())
          })
        }, 500)
      })
    })
  })
}
