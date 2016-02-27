
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

const home = process.env.HOME || process.env.USERPROFILE

/*
 * Returs a list of MJML templates
 */
export const readTemplates = (mjml) => promisify(fs.readdir)(mjml)

/*
 * Returns the MJML config
 */
export const readConfig = (mjml) => require(path.join(mjml, '.mjml.json'))

/*
 * Save an MJML template
 * template: json {
 *  mjml,
 *  name
 * }
 */
export const save = (template, location) => {
  console.log(location)
  return promisify(fs.writeFile)(path.join(location, `${template.get('name')}.json`), JSON.stringify(template.toJS(), null, 2))
}
