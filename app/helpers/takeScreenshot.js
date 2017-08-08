import { remote } from 'electron'
import path from 'path'
import os from 'os'

import { fsWriteFile } from 'helpers/fs'

const TMP_DIR = os.tmpdir()

export default function takeScreenshot(html, deviceWidth) {
  return new Promise(async resolve => {
    const win = new remote.BrowserWindow({
      width: deviceWidth,
      show: false,
    })

    const tmpFileName = path.join(TMP_DIR, 'tpm-mjml-preview.html')
    await fsWriteFile(tmpFileName, html)

    win.loadURL(`file://${tmpFileName}`)

    win.webContents.on('did-finish-load', () => {
      // Window is not fully loaded after this event, hence setTimeout()...
      win.webContents.executeJavaScript(
        "document.querySelector('body').getBoundingClientRect().height",
        height => {
          win.setSize(deviceWidth, height + 50)
          const takeShot = () => {
            win.webContents.capturePage(img => {
              // eslint-disable-line
              win.close()
              resolve(img.toPng())
            })
          }
          setTimeout(takeShot, 500)
        },
      )
    })
  })
}
