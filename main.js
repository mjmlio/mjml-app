/* eslint strict: 0 */
'use strict'

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
// const crashReporter = electron.crashReporter
const Menu = electron.Menu
const shell = electron.shell
let mainWindow = null

shell.openExternal('http://google.com')

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')()
}

app.on('ready', () => {

  const size = electron.screen.getPrimaryDisplay().workAreaSize

  mainWindow = new BrowserWindow({
    width: size.width / 1.2,
    height: size.height / 1.2,
    'min-width': 1000,
    'min-height': 600,
    titleBarStyle: 'hidden-inset',
    show: false,
    icon: './build/logo.icns'
  })

  mainWindow.webContents.on('new-window', (e, url) => {
    e.preventDefault()
    shell.openExternal(url)
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
        { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' },
        { label: 'Upadates', click () {
          shell.openExternal('https://github.com/mjmlio/mjml-app/releases')
        } },
        { label: 'Documentation', click () {
          shell.openExternal('https://mjml.io/documentation/')
        } },
        { label: 'Quit', accelerator: 'Command+Q', selector: 'Quit', click: () => {
          app.quit()
        } }
      ] }
    ]

    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
  }
})
