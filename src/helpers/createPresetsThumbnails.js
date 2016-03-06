import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import mjml2html from 'mjml/lib/mjml2html'
import { remote } from 'electron'

import * as presetsMap from '../assets/presets'
import { thumbnailsFolder } from './file-system'

const checkPresetThumbnail = preset => new Promise(resolve => {

  const { id } = preset

  const src = path.join(thumbnailsFolder, `${id}.png`)

  fs.access(src, fs.F_OK, (err) => {
    if (!err) { return resolve() }
    if (err) {
      const { mjml } = preset
      const html = mjml2html(mjml)

      remote.require('./services').takeSnapshot(id, html, resolve)
    }
  })

})

export default () => Promise.all(_.values(presetsMap).map(checkPresetThumbnail))
