const webpack = require('webpack')

const pkg = require('../package.json')

module.exports = {
  module: {
    rules: [
      {
        test: [/node_modules[\/\\]react-icons[\/\\].*\.js/],
        loaders: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __MJML_APP_VERSION__: JSON.stringify(pkg.version),
      __MJML_VERSION__: JSON.stringify(pkg.dependencies.mjml),
    }),
  ],
}
