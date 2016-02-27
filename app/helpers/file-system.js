
import fs from 'fs'
import path from 'path'


const home = process.env.HOME || process.env.USERPROFILE
  ,   mjml = path.join(home, 'MJML')


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

