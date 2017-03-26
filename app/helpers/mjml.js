import { remote } from 'electron'

export default function mjml2html (mjmlContent, filePath) {

  const {
    mjml2html: mjml2htmlService,
  } = remote.require('../services')

  return new Promise((resolve) => {
    mjml2htmlService(mjmlContent, filePath, (err, html) => {
      if (err) { return resolve('') }
      resolve(html)
    })
  })
}

export function wrapIntoMJMLTags (content) {
  return `<mjml>
  <mj-body>
    <mj-container>
      ${content}
    </mj-container>
  </mj-body>
</mjml>`
}
