const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  entry: './site/index.js',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle-[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{ loader: 'babel-loader' }],
        exclude: /node_modules/,
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: { loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
      },
      { test: /\.mp4$/, loader: 'file-loader' },
      isProd
        ? {
            test: /\.scss$/,
            use: {
              loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader!sass-loader',
              }),
            },
          }
        : {
            test: /\.scss$/,
            use: [
              { loader: 'style-loader' },
              { loader: 'css-loader' },
              { loader: 'sass-loader' },
            ],
          },
    ],
  },
  plugins: [
    ...(isProd ? [new ExtractTextPlugin('styles-[hash].css')] : []),
    new HtmlWebpackPlugin({
      template: './site/template.html',
    }),
  ],
}
