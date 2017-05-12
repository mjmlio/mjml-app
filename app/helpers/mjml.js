import { mjml2html } from 'mjml'
import path from 'path'
import stream from 'stream'

import { execFile, exec } from 'helpers/fs'

export default function (mjmlContent, filePath, mjmlPath = null) {
  return new Promise(resolve => {
    window.requestIdleCallback(async () => {
      try {
        if (mjmlPath) {

          if (!mjmlContent.trim().startsWith('<mjml>')) {

            const stdinStream = new stream.Readable()
            stdinStream.push(wrapIntoMJMLTags(mjmlContent))
            stdinStream.push(null)

            const res = await execFile(mjmlPath, ['-i', '-s'], stdinStream)
            if (res.err) { return resolve('') }

            resolve(res.stdout)

          } else {

            const res = await exec(`${mjmlPath} -s "${filePath}"`)
            if (res.err) { return resolve('') }

            resolve(res.stdout)
          }

        } else {
          if (!mjmlContent.trim().startsWith('<mjml>')) {
            mjmlContent = wrapIntoMJMLTags(mjmlContent)
          }
          const res = mjml2html(mjmlContent, { filePath, cwd: path.dirname(filePath) })
          resolve(res.html || '')
        }
      } catch (e) {
        resolve('')
      }
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
