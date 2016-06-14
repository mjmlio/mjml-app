const path = require('path')
const autoprefixer = require('autoprefixer')
const precss = require('precss')
const postcssImport = require('postcss-import')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {

  entry: './src/index',

  devtool: 'sourcemap',

  resolve: {
    modulesDirectories: ['node_modules', 'src']
  },

  module: {
    loaders: [
      { test: /\.js$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
      { test: /\.(png|jpg|svg)$/, loader: 'file' },
      {
        test: /\.s?css$/,
        loaders: ['style', 'css', 'postcss'],
        exclude: /node_modules/
      }
    ]
  },

  postcss: wp => [postcssImport({ addDependencyTo: wp }), precss, autoprefixer],

  output: {
    path: path.resolve(__dirname),
    publicPath: '/',
    filename: 'dev.js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: false
    })
  ]

}
