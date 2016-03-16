/* eslint strict: 0 */
'use strict'

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
// const crashReporter = electron.crashReporter
const Menu = electron.Menu
// const shell = electron.shell
let mainWindow = null

// TODO: make this work
// crashReporter.start()

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')()
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') { app.quit() }
})

app.on('ready', () => {

  const size = electron.screen.getPrimaryDisplay().workAreaSize

  mainWindow = new BrowserWindow({
    width: size.width / 1.2,
    height: size.height / 1.2,
    'min-width': 1000,
    'min-height': 600,
    titleBarStyle: 'hidden-inset',
    show: false,
    icon: './logo.icns'
  })

  if (process.env.HOT) {
    mainWindow.loadURL(`file://${__dirname}/src/hot-dev-app.html`)
  } else {
    mainWindow.loadURL(`file://${__dirname}/src/app.html`)
  }

  mainWindow.webContents.on('did-finish-load', () => {
    setTimeout(() => { mainWindow.show() }, 100)
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools()
  }

  if (process.platform === 'darwin') {
    const template = [{
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
        { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' }
      ] }
    ]

    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
  }
})
