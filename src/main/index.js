import { app, BrowserWindow, Menu } from 'electron'
import * as path from 'path'
import { format as formatUrl } from 'url'
import { autoUpdater } from 'electron-updater'

import buildMenu from 'menu'

const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = !isProduction

// allows app to find node when launched from GUI
const fixPath = require('fix-path')
fixPath()

let mainWindow
let menu

const [, openPath] = process.argv

const installExtensions = async () => {
  const installer = require('electron-devtools-installer')
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS']
  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload)),
  ).catch(console.log) // eslint-disable-line
}

function createMainWindow() {
  const w = new BrowserWindow({
    webPreferences: {
      webSecurity: false,
    },
    backgroundColor: '#2A2A35',
    show: false,
  })

  w.once('ready-to-show', () => {
    // if we double clicked on mjml file (or launched app with argument)
    // we send path to renderer, to directly open/create project
    if (openPath) {
      mainWindow.webContents.send('openPath', openPath)
    }
    w.show()
  })

  if (isDevelopment) {
    w.webContents.openDevTools()

    w.webContents.on('context-menu', (e, props) => {
      const { x, y } = props

      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click() {
            w.inspectElement(x, y)
          },
        },
      ]).popup(mainWindow)
    })
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

app.on('ready', async () => {
  if (isDevelopment) {
    await installExtensions()
  }
  mainWindow = createMainWindow()
  if (isProduction) {
    autoUpdater.checkForUpdatesAndNotify()
  }
})
