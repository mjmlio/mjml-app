
import fs from 'fs'
import _ from 'lodash'
import path from 'path'
import { fromJS } from 'immutable'
import { remote } from 'electron'
import mkdir from 'mkdirp'

const dataFolder = process.env.NODE_ENV === 'development'
  ? remote.app.getAppPath()
  : remote.app.getPath('appData')

export const projectFolder = path.join(dataFolder, 'mjml-app', 'MJML-Projects')
export const thumbnailsFolder = path.join(dataFolder, 'mjml-app', 'MJML-thumbnails')

/**
 * Turns a callback style function into a function that returns a promise
 *
 * @param {Function} fn function that takes a callback (err, ...data) =>
 * @returns {Function} a function that returns a Promise
 */
const promisify = fn =>
  (...args) =>
    new Promise((resolve, reject) =>
      fn(...args.concat((err, ...data) =>
        err ? reject(err) : resolve(...data))))

/**
 * Check if the needed project folders exist. If not, create them
 *
 * @returns {Promise}
 */
export const checkAndCreateAppFolders = () =>
  Promise.all([
    checkOrCreate(projectFolder),
    checkOrCreate(thumbnailsFolder),
  ])

/**
 * Read the local templates and returns a list of templates
 *
 * @returns {Promise} a promise resolving an immutable list of templates
 */
export const readTemplates = () =>
  checkOrCreate(projectFolder)
    .then(() => promisify(fs.readdir)(projectFolder))
    .then((filenames = []) =>
      Promise.all(filenames.map(filename => promisify(fs.readFile)(path.join(projectFolder, filename), 'utf8'))))
    .then(fileContents => fileContents.map(json => {
      try {
        return JSON.parse(json)
      } catch (e) {
        return null
      }
    })
    // dismiss invalid templates
    .filter(e => !!e))
    .then(templates => _.orderBy(templates, 'modificationDate', 'desc'))
    .then(fromJS)

/**
 * Returns a template given an id
 *
 * @param {String} id the wanted template's id
 * @returns {Promise}
 */
export const readTemplate = id =>
  promisify(fs.readFile)(path.join(projectFolder, `${id}.json`), 'utf8')
    .then(fileContent => JSON.parse(fileContent))
    .then(fromJS)

/**
 * Returns the app local config
 *
 * @returns {Immutable.Map}
 */
export const localConfig = () =>
  fromJS(localStorage.getItem('appconfig'))

/**
 * Resolve if the file exists
 *
 * @param {String} file name
 * @returns {Promise}
 */
export const exists = file =>
  promisify((folder, cb) => fs.access(folder, fs.R_OK | fs.W_OK, cb))(file)

/**
 * Check if the provided folder exists, otherwise, create it
 *
 * @param {String} folder the folder to check
 * @returns {Promise}
 */
const checkOrCreate = folder =>
  exists(folder)
    .catch(() => promisify(mkdir)(folder))

/**
 * Saves the mjml template to the disk
 *
 * @param {Object} template the template to save id.json
 * @returns {Promise}
 */
export const save = (template) =>
  checkOrCreate(projectFolder)
    .then(() => promisify(fs.writeFile)(path.join(projectFolder, `${template.get('id')}.json`), JSON.stringify(template.toJS(), null, 2)))

/**
 * Write a file to the disk
 *
 * @param {String} file the target file
 * @param {String} content the content to be written
 * @returns {Promise}
 */
export const writeFile = promisify(fs.writeFile)

/**
 * Read a file
 *
 * @param {String} file file name
 * @returns {Promise}
 */
export const readFile = (file) =>
  promisify(fs.readFile)(file, 'utf8')

/**
 * Write a snapshot as a png to the disk
 *
 * @param {Object} image the raw image buffer
 * @param {String} id the template id associated to the image
 * @returns {Promise}
 */
export const writeSnapshot = (img, id) =>
  writeFile(path.join(thumbnailsFolder, `${id}.png`), img.toPng())

/**
 * Delete a template from disk
 *
 * @param {String} id tempalte id
 * @returns {Promise}
 */
export const deleteTemplate = (id) =>
  promisify(fs.unlink)(path.join(projectFolder, `${id}.json`))
