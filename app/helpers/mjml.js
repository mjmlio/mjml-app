import { remote } from 'electron'


export function mjml2html (mjmlContent) {

  const {
    mjml2html: mjml2htmlService,
  } = remote.require('../services')

  return new Promise((resolve, reject) => {
    mjml2htmlService(mjmlContent, (err, html) => {
      if (err) { return reject(err) }
      resolve(html)
    })
  })
}
