/**
 * Base webpack config used across other specific configs
 */

import webpack from 'webpack'
import path from 'path'
import validate from 'webpack-validator'
import { dependencies as externals } from './src/package.json'

export default validate({
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/,
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }, {
      test: [/node_modules\/react-icons\/.*\.js/], // eslint-disable-line
      loaders: ['babel-loader'],
    }, {
      // see https://github.com/nathanbuchar/electron-settings/issues/38#issuecomment-258727500
      test: [/node_modules[\\\/](?:electron-settings|key-path-helpers)[\\\/]lib[\\\/](?:.+).js/], // eslint-disable-line
      loaders: ['babel-loader'],
    }],
  },

  output: {
    path: path.join(__dirname, 'src'),
    filename: 'bundle.js',

    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2',
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
  },

  plugins: [
    new webpack.IgnorePlugin(/vertx/),
  ],

  externals: Object.keys(externals || {}),
})
