const path = require('path')
const webpack = require('webpack')
const config = require('./webpack.base.conf')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

config.devtool = '#source-map'
config.output.libraryTarget = 'umd'
config.output.library = 'VueHotelDatepicker'
config.entry = {
  // 'vue-hotel-datepicker': path.resolve(__dirnme, '../src/HotelDatePicker.vue'),
  'vue-hotel-datepicker.min': path.resolve(__dirname, '../src/HotelDatePicker.vue')
}
config.output.filename = '[name].js'

config.module.rules.push({
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: "css-loader",
  }),
})

config.plugins = (config.plugins || []).concat([
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
  new ExtractTextPlugin({
    filename: 'vue-hotel-datepicker.min.css',
  }),
  new UglifyJSPlugin({
    include: /\.min\.js$/,  // only uglify *.min.js
    sourceMap: true,
    compress: {
      warnings: false,
      drop_debugger: true,
      drop_console: true,
      screw_ie8: true,
      global_defs: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      },
    }
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
])

module.exports = config
