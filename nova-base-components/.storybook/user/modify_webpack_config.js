const path = require('path')

module.exports = function (config) {
  // This is the default webpack config defined in the `../webpack.config.js`
  // modify as you need.
  config.module.loaders = [
    {
      test: /\.css$/,
      loader: 'style!css!',
      include: [
        path.resolve(__dirname, '../../'),
        path.resolve(__dirname, '../../../nova-base-styles/'),
      ],
    },
    {
      test: /\.scss$/,
      loader: 'style!css!sass!',
      include: [
        path.resolve(__dirname, '../../'),
        path.resolve(__dirname, '../../../nova-base-styles/'),
      ],
    },
    {
      test: /\.sass$/,
      loader: 'style!css!sass?indentedSyntax=sass!',
      include: [
        path.resolve(__dirname, '../../'),
        path.resolve(__dirname, '../../../nova-base-styles/'),
      ],
    },
  ]
}
