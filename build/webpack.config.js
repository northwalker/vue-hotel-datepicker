const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'

console.log('isProduction', isProduction)
module.exports = {
  devtool: isProduction ? '#source-map' : '#cheap-module-eval-source-map',
  devServer: {
    // historyApiFallback: true, // 404s will fallback to...
    noInfo: true
  },
  performance: {
    hints: false
  },
  entry: {
    app: path.join(__dirname, '../src/index.js')
  },
  output: {
    path: isProduction ? path.join(__dirname, '../docs') : path.join(__dirname, '../docs'),
    publicPath: '',
    filename: isProduction
      ? 'js/[name].[chunkhash:7].js'
      : '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/, // test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/,
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: [autoprefixer({
            browsers: [
              '> 1%',
              'last 2 versions',
              'not ie <= 8'
            ]
          })],
          loaders: {
            css: ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
            }),
            // simple example with ExtractTextPlugin.
            scss: ExtractTextPlugin.extract({
              use: 'css-loader!sass-loader',
              fallback: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
            })
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, '../src/'),
        exclude: path.join(__dirname, '../node_modules/')
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader!css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9' // React doesn't support IE8 anyway
                  ]
                })
              ]
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new ExtractTextPlugin({
      filename: isProduction
        ? 'css/[name].[contenthash:7].css'
        : '[name].css'
    }),
    new HtmlWebpackPlugin({
      title: 'Vue Hotel Datepicker Demo',
      inject: true,
      filename: 'index.html',
      template: path.join(__dirname, '../src/index.html'),
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ]
}
