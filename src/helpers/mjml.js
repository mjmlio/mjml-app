import mjml2html from 'mjml'
import migrate from 'mjml-migrate'
import path from 'path'
import stream from 'stream'

import { execFile, exec } from 'helpers/fs'

export default function(mjmlContent, filePath, mjmlPath = null, options = {}) {
  return new Promise(resolve => {
    window.requestIdleCallback(async () => {
      try {
        if (mjmlPath) {
          if (!mjmlContent.trim().startsWith('<mjml')) {
            const stdinStream = new stream.Readable()
            stdinStream.push(wrapIntoMJMLTags(mjmlContent))
            stdinStream.push(null)

            const args = [
              '-i',
              '-s',
              '--config.validationLevel=skip',
              ...(options.minify ? ['-m'] : []),
            ]

            const res = await execFile(mjmlPath, args, stdinStream)
            if (res.err) {
              return resolve({ html: '', errors: [] })
            }

            resolve({ html: res.stdout, errors: [] })
          } else {
            const args = [
              '-s',
              ' --config.validationLevel="skip"',
              ...(options.minify ? ['-m'] : []),
            ]

            const res = await exec(`${mjmlPath} "${filePath}" ${args.join(' ')}`)
            if (res.err) {
              return resolve({ html: '', errors: [] })
            }
            resolve({ html: res.stdout, errors: [] })
          }
        } else {
          if (!mjmlContent.trim().startsWith('<mjml')) {
            mjmlContent = wrapIntoMJMLTags(mjmlContent)
          }
          const mjmlOptions = {
            filePath,
            cwd: path.dirname(filePath),
            minify: !!options.minify,
          }
          const res = mjml2html(mjmlContent, mjmlOptions)

          resolve({ html: res.html || '', errors: res.errors || [] })
        }
      } catch (e) {
        resolve({ html: '', errors: [] })
      }
    })
  })
}

export function wrapIntoMJMLTags(content) {
  return `<mjml>
  <mj-body>
    ${content}
  </mj-body>
</mjml>`
}

export function migrateToMJML4(content) {
  return migrate(content)
}
