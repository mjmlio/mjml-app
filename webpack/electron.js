import webpack from 'webpack'
import path from 'path'
import merge from 'webpack-merge'
import BabiliPlugin from 'babili-webpack-plugin'
import baseConfig from './base'

import pkg from '../package.json'

export default merge(baseConfig, {
  entry: ['babel-polyfill', './app/main.development'],

  output: {
    path: path.join(__dirname, '..'),
    filename: './app/main.js',
  },

  plugins: [
    /**
     * Babli is an ES6+ aware minifier based on the Babel toolchain (beta)
     */
    new BabiliPlugin({
      // Disable deadcode until https://github.com/babel/babili/issues/385 fixed
      deadcode: false,
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
      __MJML_APP_VERSION__: JSON.stringify(pkg.version),
      __MJML_VERSION__: JSON.stringify(pkg.dependencies.mjml),
    }),
  ],

  target: 'electron-main',

  /**
   * Disables webpack processing of __dirname and __filename.
   * If you run the bundle in node.js it falls back to these values of node.js.
   * https://github.com/webpack/webpack/issues/2010
   */
  node: {
    __dirname: false,
    __filename: false,
  },
})
