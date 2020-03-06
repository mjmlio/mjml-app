import './style.scss'

const REL_URL = 'https://api.github.com/repos/mjmlio/mjml-app/releases'

let os = 'linux'

if (navigator.appVersion.indexOf('Win') !== -1) {
  os = 'windows'
} else if (navigator.appVersion.indexOf('Mac') !== -1) {
  os = 'osx'
}

const osLabel = { windows: 'Windows', osx: 'Mac', linux: 'Linux' }[os]

const dlGeneral = document.getElementById('dl-general')
const dlLinux = document.getElementById('dl-linux')
const dlWin = document.getElementById('dl-win')
const dlOSX = document.getElementById('dl-osx')

fetch(REL_URL)
  .then(res => res.json())
  .then(res => {
    const lastVersion = res[0]
    document.getElementById('dl-btn-label').innerHTML = `&nbsp;- ${lastVersion.tag_name}`
    document.getElementById('dl-dl-dl').innerHTML = `Download for ${osLabel}`
    
    const { name, assets } = lastVersion

    const linuxName = `mjml-app-${name}-linux-x64.tar.gz`
    const winName = `mjml-app-win-x64_${name}.exe`
    const osxName = `mjml-app-${name}-mac.dmg`
    
    let linuxUrl, winUrl, osxUrl
    
    for (let i = 0; i < assets.length; i++) {
      switch (assets[i].name) {
        case linuxName:
          linuxUrl = assets[i].browser_download_url
          break;
        case winName:
          winUrl = assets[i].browser_download_url
          break;
        case osxName:
          osxUrl = assets[i].browser_download_url
          break;
      }
    }
    
    if (linuxUrl) dlLinux.setAttribute('href', linuxUrl)
    if (winUrl) dlWin.setAttribute('href', winUrl)
    if (osxUrl) dlOSX.setAttribute('href', osxUrl)
    
    switch (os) {
      case 'linux':
        dlGeneral.setAttribute('href', linuxUrl)
        break;
      case 'windows':
        dlGeneral.setAttribute('href', winUrl)
        break;
      case 'osx':
        dlGeneral.setAttribute('href', osxUrl)
        break;
    }
  })

// tracking

dlGeneral.addEventListener('click', createTracking(os))
dlLinux.addEventListener('click', createTracking('linux'))
dlWin.addEventListener('click', createTracking('windows'))
dlOSX.addEventListener('click', createTracking('osx'))

function createTracking(os) {
  return function() {
    dataLayer.push({
      // eslint-disable-line
      eventValue: 'mjmlApp-Downloaded',
      event: 'mjml-app',
      button: os,
    })
  }
}
