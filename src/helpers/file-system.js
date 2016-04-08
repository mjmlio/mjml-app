
import fs from 'fs'
import _ from 'lodash'
import path from 'path'
import { fromJS } from 'immutable'
import { remote } from 'electron'
import mkdir from 'mkdirp'

const dataFolder = process.env.NODE_ENV === 'development' ?
  remote.app.getAppPath() : remote.app.getPath('appData')

export const projectFolder = path.join(dataFolder, 'mjml-app', 'MJML-Projects')
export const thumbnailsFolder = path.join(dataFolder, 'mjml-app', 'MJML-thumbnails')

/*
 * Turns a callback style to a Promise style one
 */
const promisify = fn =>
  (...args) =>
    new Promise((resolve, reject) =>
      fn(...args.concat((err, ...data) =>
        err ? reject(err) : resolve(...data))))

export const checkAndCreateAppFolders = () =>
  Promise.all([
    checkOrCreate(projectFolder),
    checkOrCreate(thumbnailsFolder)
  ])

/*
 * Returns a list of MJML templates
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
    }).filter(e => !!e))
    .then(templates => _.orderBy(templates, 'modificationDate', 'desc'))
    .then(fromJS)

/**
 * Return a single MJML template given its id
 */
export const readTemplate = id =>
  promisify(fs.readFile)(path.join(projectFolder, `${id}.json`), 'utf8')
    .then(fileContent => JSON.parse(fileContent))
    .then(fromJS)

/*
 * Returns the MJML config
 */
export const localConfig = () =>
  fromJS(localStorage.getItem('appconfig'))

export const exists = file => 
  promisify((folder, cb) => fs.access(folder, fs.R_OK | fs.W_OK, cb))(file)
    
const checkOrCreate = folder =>
  exists(folder)
    .catch(() => promisify(mkdir)(folder))

/*
 * Save an MJML template
 * template: json {
 *  mjml,
 *  name
 * }
 */
export const save = (template) =>
  checkOrCreate(projectFolder)
    .then(() => promisify(fs.writeFile)(path.join(projectFolder, `${template.get('id')}.json`), JSON.stringify(template.toJS(), null, 2)))

export const writeFile = promisify(fs.writeFile)

export const readFile = (file) =>
  promisify(fs.readFile)(file, 'utf8')

export const writeSnapshot = (img, id) =>
  writeFile(path.join(thumbnailsFolder, `${id}.png`), img.toPng())

/**
 * Delete a template
 */
export const deleteTemplate = (id) =>
  promisify(fs.unlink)(path.join(projectFolder, `${id}.json`))
