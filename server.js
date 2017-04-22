import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import { spawn } from 'child_process'

import config from './webpack/dev'

const argv = require('minimist')(process.argv.slice(2))

const app = express()
const compiler = webpack(config)
const PORT = process.env.PORT || 3000

const wdm = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  },
})

app.use(wdm)

app.use(webpackHotMiddleware(compiler))

const server = app.listen(PORT, 'localhost', serverError => {
  if (serverError) {
    return console.error(serverError) // eslint-disable-line
  }

  if (argv['start-hot']) {
    spawn('npm', ['run', 'start-hot'], { shell: true, env: process.env, stdio: 'inherit' })
      .on('close', code => process.exit(code))
      .on('error', spawnError => console.error(spawnError)) // eslint-disable-line
  }

  console.log(`Listening at http://localhost:${PORT}`) // eslint-disable-line
})

process.on('SIGTERM', () => {
  console.log('Stopping dev server') // eslint-disable-line
  wdm.close()
  server.close(() => {
    process.exit(0)
  })
})
