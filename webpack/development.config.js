/* eslint strict: 0 */
'use strict'

const webpack = require('webpack')
const electronRenderer = require('webpack-target-electron-renderer')
const postcssImport = require('postcss-import')
const precss = require('precss')

const baseConfig = require('./base.config')

const config = Object.create(baseConfig)

config.debug = true

config.devtool = 'cheap-module-eval-source-map'

config.entry = [
  'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
  './src/index'
]

config.output.publicPath = 'http://localhost:3000/dist/'

config.module.loaders.push({
  test: /\.scss$/,
  loaders: ['style', 'css', 'postcss']
})

config.postcss = wp => [
  postcssImport({ addDependencyTo: wp }),
  precss
]

config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    __DEV__: true,
    'process.env': {
      NODE_ENV: JSON.stringify('development')
    }
  })
)

config.target = electronRenderer(config)

module.exports = config
