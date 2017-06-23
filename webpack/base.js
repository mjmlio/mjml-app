import webpack from 'webpack'
import path from 'path'
import { dependencies as externals } from '../app/package.json'

export default {
  module: {
    rules: [
      {
        test: /\.js?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: [
          /node_modules[\/\\]react-icons[\/\\].*\.js/,
          /node_modules[\/\\]mailjet-icons[\/\\].*\.js/,
        ], // eslint-disable-line
        loaders: ['babel-loader'],
      },
      {
        // see https://github.com/nathanbuchar/electron-settings/issues/38#issuecomment-258727500
        test: [/node_modules[\\\/](?:electron-settings|key-path-helpers)[\\\/]lib[\\\/](?:.+).js/], // eslint-disable-line
        loaders: ['babel-loader'],
      },
    ],
  },

  output: {
    path: path.join(__dirname, '../app'),
    filename: 'bundle.js',

    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2',
  },

  plugins: [new webpack.IgnorePlugin(/vertx/)],

  externals: Object.keys(externals || {}),
}
