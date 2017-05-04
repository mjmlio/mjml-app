import { BrowserWindow, remote } from 'electron'

export default async function takeScreenshot (html, deviceWidth) {
  return new Promise((resolve, reject) => {
    const win = new remote.BrowserWindow({
      width: deviceWidth,
      show: false
    })
    
    win.loadURL(`data:text/html, ${encodeURIComponent(html)}`)
    
    win.webContents.on('did-finish-load', () => {
      // Window is not fully loaded after this event, hence setTimeout()...
      setTimeout(() => {
        win.webContents.executeJavaScript(`document.querySelector('body').getBoundingClientRect().height`, function (result) {
          console.log(result)
        })
        win.webContents.capturePage(function handleCapture (img) {
            resolve(img.toPng())
        }) 
      }, 100)
    })
  })
}
