/* eslint strict: 0 */
'use strict'

const webpack = require('webpack')
const precss = require('precss')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const electronRenderer = require('webpack-target-electron-renderer')

const baseConfig = require('./base.config')

const config = Object.create(baseConfig)

config.devtool = 'source-map'

config.entry = './app/index'

config.output.publicPath = '../dist/'

config.module.loaders.push({
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract(
    'style',
    'css!postcss'
  )
})

config.postcss = wp => [
  precss
]

config.plugins.push(
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    __DEV__: false,
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      screw_ie8: true,
      warnings: false
    }
  }),
  new ExtractTextPlugin('style.css', { allChunks: true })
)

config.target = electronRenderer(config)

module.exports = config
