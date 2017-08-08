import webpack from 'webpack'
import merge from 'webpack-merge'
import baseConfig from './base'

import pkg from '../package.json'

const port = process.env.PORT || 3000

export default merge(baseConfig, {
  devtool: 'eval',

  entry: [
    `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`,
    'babel-polyfill',
    './app/index',
  ],

  output: {
    publicPath: `http://localhost:${port}/dist/`,
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },

      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream',
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __MJML_APP_VERSION__: JSON.stringify(pkg.version),
      __MJML_VERSION__: JSON.stringify(pkg.dependencies.mjml),
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
  ],

  target: 'electron-renderer',
  externals: ['mjml-core', 'node-mailjet'],
})
