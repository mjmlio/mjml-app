
import fs from 'fs'
import _ from 'lodash'
import path from 'path'
import { fromJS } from 'immutable'
import { remote } from 'electron'

export const projectFolder = path.join(remote.app.getAppPath(), 'mjml-projects')

/*
 * Turns a callback style to a Promise style one
 */
const promisify = fn =>
  (...args) =>
    new Promise((resolve, reject) =>
      fn(...args.concat((err, ...data) =>
        err ? reject(err) : resolve(...data))))

/*
 * Returns a list of MJML templates
 */
export const readTemplates = () =>
  checkOrCreate(projectFolder)
    .then(() => promisify(fs.readdir)(projectFolder))
    .then((filenames = []) =>
      Promise.all(filenames.map(filename => promisify(fs.readFile)(path.join(projectFolder, filename), 'utf8'))))
    .then(fileContents => fileContents.map(JSON.parse))
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

const checkOrCreate = () =>
  promisify((projectFolder, cb) => fs.access(projectFolder, fs.R_OK | fs.W_OK, cb))(projectFolder)
    .catch(() => promisify(fs.mkdir)(projectFolder))

/*
 * Save an MJML template
 * template: json {
 *  mjml,
 *  name
 * }
 */
export const save = (template) =>
  checkOrCreate()
    .then(() => promisify(fs.writeFile)(path.join(projectFolder, `${template.get('id')}.json`), JSON.stringify(template.toJS(), null, 2)))

export const writeFile = promisify(fs.writeFile)

export const readFile = (file) =>
  promisify(fs.readFile)(file, 'utf8')

/**
 * Delete a template
 */
export const deleteTemplate = (id) =>
  promisify(fs.unlink)(path.join(projectFolder, `${id}.json`))
