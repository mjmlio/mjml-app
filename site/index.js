import './style.scss'

const REL_URL = 'https://api.github.com/repos/mjmlio/mjml-app/releases'

fetch(REL_URL)
  .then(res => res.json())
  .then(res => {
    const lastVersion = res[0]
    document.getElementById('dl-btn-label').innerHTML = `&nbsp;- ${lastVersion.tag_name}`
  })
