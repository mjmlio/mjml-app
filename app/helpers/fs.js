import fs from 'fs'
import path from 'path'
import promisify from 'es6-promisify'
import { remote } from 'electron'
import rimrafModule from 'rimraf'
import { exec as x, execFile as xFile } from 'child_process'

const { dialog } = remote

export const fsReadDir = promisify(fs.readdir)
export const fsRename = promisify(fs.rename)
export const fsReadFile = promisify(fs.readFile)
export const fsWriteFile = promisify(fs.writeFile)
export const fsAccess = promisify(fs.access)
export const fsStat = promisify(fs.stat)
export const fsMkdir = promisify(fs.mkdir)
export const rimraf = promisify(rimrafModule)

function getFileInfoFactory(p) {
  return async name => {
    const fullPath = path.resolve(p, name)
    try {
      const stats = await fsStat(fullPath)
      return {
        name,
        path: fullPath,
        isFolder: stats.isDirectory(),
      }
    } catch (err) {
      return {
        name,
        path: fullPath,
        isFolder: false,
      }
    }
  }
}

export function sortFiles(files) {
  files.sort((a, b) => {
    if (a.isFolder && !b.isFolder) {
      return -1
    }
    if (!a.isFolder && b.isFolder) {
      return 1
    }
    const aName = a.name.toLowerCase()
    const bName = b.name.toLowerCase()
    if (aName < bName) {
      return -1
    }
    if (aName > bName) {
      return 1
    }
    return 0
  })
}

export async function readDir(p) {
  const filesList = await fsReadDir(p)
  const filtered = filesList.filter(f => !f.startsWith('.'))
  const getFileInfo = getFileInfoFactory(p)
  const enriched = await Promise.all(filtered.map(getFileInfo))
  return enriched
}

export function fileDialog(options) {
  const res = dialog.showOpenDialog(options)
  if (!res || !res.length) {
    return null
  }
  const p = res[0]
  return p || null
}

export function saveDialog(options) {
  const res = dialog.showSaveDialog(options)
  return res
}

export async function isValidDir(path) {
  try {
    await fsAccess(path, fs.constants.R_OK | fs.constants.W_OK)
  } catch (e) {
    return false
  }
  const stats = await fsStat(path)
  return stats.isDirectory()
}

export async function alreadyExists(location) {
  try {
    await fsAccess(location, fs.constants.R_OK | fs.constants.W_OK)
  } catch (err) {
    if (err.code === 'ENOENT') {
      return false
    }
    return true
  }
  return true
}

export async function isEmptyOrDontExist(location) {
  try {
    await fsAccess(location, fs.constants.R_OK | fs.constants.W_OK)
  } catch (err) {
    if (err.code === 'ENOENT') {
      return true
    }
    return false
  }
  const filesList = await fsReadDir(location)
  return filesList.length === 0
}

export async function createOrEmpty(location) {
  try {
    await fsAccess(location, fs.constants.R_OK | fs.constants.W_OK)
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fsMkdir(location)
    }
  }
  const filesList = await fsReadDir(location)
  if (filesList.length > 0) {
    throw new Error('Directory not empty')
  }
}

export function exec(cmd) {
  return new Promise(resolve => {
    try {
      x(cmd, (err, stdout, stderr) => {
        resolve({
          err,
          stdout,
          stderr,
        })
      })
    } catch (err) {
      resolve({ err })
    }
  })
}

export function execFile(cmd, opts, stdinStream) {
  return new Promise(resolve => {
    try {
      const child = xFile(cmd, opts, (err, stdout, stderr) => {
        resolve({
          err,
          stdout,
          stderr,
        })
      })
      stdinStream.pipe(child.stdin)
    } catch (err) {
      resolve({ err })
    }
  })
}

export async function fileExists(p) {
  try {
    await fsAccess(p, fs.constants.F_OK)
    return true
  } catch (err) {
    // eslint-disable-line
    return false
  }
}
