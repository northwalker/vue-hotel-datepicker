const path = require('path')
const webpack = require('webpack')
const config = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')

config.devtool = '#eval-source-map'
config.devServer = {
  host: 'localhost',
  port: 8080,
  historyApiFallback: true,
  hotOnly: true,
  overlay: true,
  noInfo: true,
}


config.module.rules = (config.module.rules || []).concat([
  {
    test: /\.css$/,
    loader: 'style-loader!css-loader'
  },
  {
    test: /\.scss$/,
    loader: 'style-loader!css-loader!sass-loader'
  }
])

config.plugins = (config.plugins || []).concat([
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),

  new HtmlWebpackPlugin({
    title: 'Demo',
    filename: 'index.html',
    template: path.resolve(__dirname, '../src/index.html'),
  }),

  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
])

module.exports = config
