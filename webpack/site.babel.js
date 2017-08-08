import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'

const isProd = process.env.NODE_ENV === 'production'

export default {
  entry: './site/index.js',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle-[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
      { test: /\.mp4$/, loader: 'file-loader' },
      isProd
        ? {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: 'css-loader!sass-loader',
            }),
          }
        : {
            test: /\.scss$/,
            loaders: ['style-loader', 'css-loader', 'sass-loader'],
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
