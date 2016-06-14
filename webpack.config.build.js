const path = require('path')
const autoprefixer = require('autoprefixer')
const precss = require('precss')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {

  entry: './src/index',

  resolve: {
    modulesDirectories: ['node_modules', 'src']
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.(png|jpg|svg)$/, loader: 'file' },
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss'),
        exclude: /node_modules/
      }
    ]
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main-[hash].min.js'
  },

  postcss: () => [precss, autoprefixer],

  plugins: [
    new ExtractTextPlugin('styles-[hash].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: { collapseWhitespace: true },
      inject: false
    })
  ]

}
