import values from 'lodash/values'

const githubTemplatesRoot = 'https://raw.githubusercontent.com/mjmlio/email-templates/master'

export default async function fetchGallery() {
  const res = await fetch(
    'https://api.github.com/repos/mjmlio/email-templates/git/trees/master?recursive=1',
  )
  const parsedRes = await res.json()
  const { tree } = parsedRes
  const imagesToLoad = []
  const map = tree.reduce((map, item) => {
    const { path } = item

    if (!path.startsWith('templates/') && !path.startsWith('thumbnails/')) {
      return map
    }

    const extract = /.*\/([^.]*)\..*/.exec(path)
    if (!extract) {
      return map
    }

    const templateName = extract[1]
    const isMJML = path.endsWith('.mjml')

    if (!map[templateName]) {
      map[templateName] = {}
    }

    const fullPath = `${githubTemplatesRoot}/${path}`

    if (isMJML) {
      map[templateName].mjml = fullPath
      map[templateName].name = templateName
    } else {
      imagesToLoad.push(fullPath)
      map[templateName].thumbnail = fullPath
    }

    return map
  }, {})

  await Promise.all(imagesToLoad.map(loadImage))

  return values(map)
}

function loadImage(src) {
  return new Promise(resolve => {
    const img = new Image()
    img.onload = resolve
    img.onerror = resolve
    img.src = src
  })
}
