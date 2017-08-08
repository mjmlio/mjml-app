import './style.scss'

const REL_URL = 'https://api.github.com/repos/mjmlio/mjml-app/releases'

let os = 'linux'

if (navigator.appVersion.indexOf('Win') !== -1) {
  os = 'windows'
} else if (navigator.appVersion.indexOf('Mac') !== -1) {
  os = 'osx'
}

const osLabel = { windows: 'Windows', osx: 'Mac', linux: 'Linux' }[os]

fetch(REL_URL).then(res => res.json()).then(res => {
  const lastVersion = res[0]
  document.getElementById('dl-btn-label').innerHTML = `&nbsp;- ${lastVersion.tag_name}`
  document.getElementById('dl-dl-dl').innerHTML = `Download for ${osLabel}`
})

// tracking

const dlGeneral = document.getElementById('dl-general')
const dlLinux = document.getElementById('dl-linux')
const dlWin = document.getElementById('dl-win')
const dlOSX = document.getElementById('dl-osx')

// windows being windows... always shitty, even on links.
if (os === 'windows') {
  dlGeneral.setAttribute('href', 'http://mjml-app.sigsev.io/download/win_64')
}

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
