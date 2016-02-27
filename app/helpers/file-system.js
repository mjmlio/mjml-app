
import fs from 'fs'
import path from 'path'

/*
 * Turns a callback style to a Promise style one
 */
const promisify = fn =>
  (...args) =>
    new Promise((resolve, reject) =>
      fn(...args.concat((err, ...data) =>
        err ? reject(err) : resolve(...data))))

/*
 * Check the existence of a file
 */
const exists = promisify((file, cb) => fs.access(file, fs.R_OK | fs.W_OK, cb))

const home = process.env.HOME || process.env.USERPROFILE
  ,   mjml = path.join(home, 'MJML')

/*
 * Returs a list of MJML templates
 */
export const readTemplates = () => promisify(fs.readdir)(mjml)

/*
 * Returns the MJML config
 */
export const readConfig = () => require(path.join(mjml, '.mjml.json'))

/*
 * Save an MJML template
 */
export const save = (content, name, location = mjml) =>
  promisify(fs.writeFile)(path.join(location, name), content)
