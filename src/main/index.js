'use strict'

import { app, BrowserWindow, Menu } from 'electron'
import * as path from 'path'
import { format as formatUrl } from 'url'

import buildMenu from 'menu'

const isDevelopment = process.env.NODE_ENV !== 'production'

let mainWindow
let menu

function createMainWindow() {
  const w = new BrowserWindow()

  if (isDevelopment) {
    w.webContents.openDevTools()
  }

  const url = isDevelopment
    ? `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
    : formatUrl({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true,
      })

  const template = buildMenu(w)

  menu = Menu.buildFromTemplate(template)

  if (process.platform === 'darwin') {
    Menu.setApplicationMenu(menu)
  } else {
    w.setMenu(menu)
  }

  w.loadURL(url)
  w.on('closed', () => (mainWindow = null))

  return w
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

app.on('ready', () => {
  mainWindow = createMainWindow()
})
