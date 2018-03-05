import { app, BrowserWindow, Menu } from 'electron'
import * as path from 'path'
import { format as formatUrl } from 'url'
import { autoUpdater } from 'electron-updater'

import buildMenu from 'menu'

const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = !isProduction

let mainWindow
let menu

function createMainWindow() {
  const w = new BrowserWindow({
    webPreferences: {
      webSecurity: false,
    },
    backgroundColor: '#2A2A35',
    show: false,
  })

  w.once('ready-to-show', () => {
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

app.on('ready', () => {
  mainWindow = createMainWindow()
  if (isProduction) {
    autoUpdater.checkForUpdatesAndNotify()
  }
})
