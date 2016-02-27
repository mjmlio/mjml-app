
import fs from 'fs'
import _ from 'lodash'
import path from 'path'
import { fromJS } from 'immutable'

/*
 * Turns a callback style to a Promise style one
 */
const promisify = fn =>
  (...args) =>
    new Promise((resolve, reject) =>
      fn(...args.concat((err, ...data) =>
        err ? reject(err) : resolve(...data))))

/*
 * Returs a list of MJML templates
 */
export const readTemplates = (location) =>
  promisify(fs.readdir)(location)
    .then(filenames =>
      Promise.all(filenames.map(filename => promisify(fs.readFile)(path.join(location, filename), 'utf8'))))
    .then(fileContents => fileContents.map(JSON.parse))
    .then(templates => _.orderBy(templates, 'creationDate', 'desc'))
    .then(fromJS)

/*
 * Returns the MJML config
 */
export const readConfig = (location) => require(path.join(location, '.mjml.json'))

const checkOrCreate = (location) =>
  promisify((location, cb) => fs.access(location, fs.R_OK | fs.W_OK, cb))(location)
    .catch(() => promisify(fs.mkdir)(location))

/*
 * Save an MJML template
 * template: json {
 *  mjml,
 *  name
 * }
 */
export const save = (template, location) =>
  checkOrCreate(location)
    .then(() => promisify(fs.writeFile)(path.join(location, `${template.get('id')}.json`), JSON.stringify(template.toJS(), null, 2)))

