var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CarteBlanche = require('carte-blanche');

module.exports = {
  devtool: 'eval',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  entry: [
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server',
    path.join(__dirname, './demo/index.js'),
  ],

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, './demo/index.html'),
    }),
    new CarteBlanche({
      componentRoot: './demo/components',
      dest: 'components'
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/,
        include: [
          path.join(__dirname, './src'),
          path.join(__dirname, './demo'),
        ],
      },
    ],
  },
  devServer: {
    // It suppress error shown in console, so it has to be set to false.
    // quiet: false,
    // It suppress everything except error, so it has to be set to false as well
    // to see success build.
    noInfo: true,
    stats: {
      // Config for minimal console.log mess.
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
    },
  },
};
