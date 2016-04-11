/* eslint strict: 0 */
'use strict'

const path = require('path')
const webpack = require('webpack')

module.exports = {
  module: {
    loaders: [{
      test: /\.js?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new webpack.DefinePlugin({ "global.GENTLY": false }),
  ],
  externals: [
    // put your node 3rd party libraries which can't be built with webpack here (mysql, mongodb, and so on..)
  ]
}
