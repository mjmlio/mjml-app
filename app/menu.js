import { app, shell } from 'electron'

export default function buildMenu(mainWindow) {
  return [
    {
      label: 'MJML',
      submenu: [
        {
          label: 'New project',
          click() {
            mainWindow.webContents.send('redux-command', 'new-project')
          },
        },
        {
          label: 'Open project',
          click() {
            mainWindow.webContents.send('redux-command', 'open-project')
          },
        },
        {
          type: 'separator',
        },
        {
          label: 'About',
          click() {
            mainWindow.webContents.send('redux-command', 'about')
          },
        },
        {
          label: 'Documentation',
          click() {
            shell.openExternal('https://mjml.io/documentation/')
          },
        },
        {
          label: 'Browser Editor',
          click() {
            shell.openExternal('https://mjml.io/try-it-live')
          },
        },
        {
          type: 'separator',
        },
        {
          label: 'Quit MJML',
          accelerator: 'Command+Q',
          click() {
            app.quit()
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Cut',
          accelerator: 'Command+X',
          selector: 'cut:',
        },
        {
          label: 'Copy',
          accelerator: 'Command+C',
          selector: 'copy:',
        },
        {
          label: 'Paste',
          accelerator: 'Command+V',
          selector: 'paste:',
        },
        {
          label: 'Select All',
          accelerator: 'Command+A',
          selector: 'selectAll:',
        },
      ],
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'Command+R',
          click() {
            mainWindow.webContents.reload()
          },
        },
        {
          label: 'Toggle Full Screen',
          accelerator: 'Ctrl+Command+F',
          click() {
            mainWindow.setFullScreen(!mainWindow.isFullScreen())
          },
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: 'Alt+Command+I',
          click() {
            mainWindow.toggleDevTools()
          },
        },
      ],
    },
    {
      label: 'Window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'Command+M',
          selector: 'performMiniaturize:',
        },
        {
          label: 'Hide MJML',
          accelerator: 'Command+H',
          selector: 'hide:',
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          selector: 'hideOtherApplications:',
        },
        {
          label: 'Show All',
          selector: 'unhideAllApplications:',
        },
      ],
    },
  ]
}
