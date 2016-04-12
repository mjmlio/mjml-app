import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import { remote } from 'electron'
import * as presetsMap from '../assets/presets'
import { thumbnailsFolder } from './file-system'

/**
 * Given a preset, if there is not an existing thumbnail, create it
 *
 * @param {Object} preset the checked preset
 * @returns {Promise} resolve anyway
 */
const checkPresetThumbnail = preset => new Promise(resolve => {

  const { id } = preset

  const src = path.join(thumbnailsFolder, `${id}.png`)

  fs.access(src, fs.F_OK, (err) => {
    if (!err) { return resolve() }
    if (err) {
      const { mjml } = preset

      const { mjml2html } = remote.require('./services')

      mjml2html(mjml, (err, html) => {
        if (err) { resolve(null) }
        remote.require('./services').takeSnapshot(id, html, resolve)
      })
    }
  })

})

/**
 * Run checkPresetThumbnail for each preset in presetsMap
 *
 * @returns {Promise}
 */
export default () => Promise.all(_.values(presetsMap).map(checkPresetThumbnail))
