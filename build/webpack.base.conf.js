const path = require('path')
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  entry: {
    app: [path.resolve(__dirname, '../src/index.js')],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'build.js',
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: path.join(__dirname, './src/'),
        exclude: /node_modules/,
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // cssModules: {
          //   // Add <style module> in *.vue file
          //   localIdentName: '[name]-[local]-[hash:base64:5]',
          //   camelCase: true
          // },
          // postcss: [autoprefixer({
          //   browsers: [
          //     '> 1%',
          //     'last 2 versions',
          //     'not ie <= 8'
          //   ]
          // })],
          loaders: {
            // ////////////////////////////////////////////////////////////////////////////////////
            // css: ExtractTextPlugin.extract({
            //   use: 'css-loader',
            //   fallback: 'vue-style-loader'
            //   // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
            // }),
            // scss: ExtractTextPlugin.extract({
            //   use: [
            //     {
            //       loader: 'css-loader',
            //       options: {
            //         minimize: isProduction,
            //         sourceMap: isProduction
            //       }
            //     },
            //     'sass-loader'
            //   ],
            //   fallback: 'vue-style-loader'
            // })
            // ////////////////////////////////////////////////////////////////////////////////////
            // simple example with ExtractTextPlugin.
            // scss: ExtractTextPlugin.extract({
            //   use: 'css-loader!sass-loader',
            //   fallback: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
            // })
            // ////////////////////////////////////////////////////////////////////////////////////
            // original example
            css: 'vue-style-loader!css-loader',
            scss: 'vue-style-loader!css-loader!sass-loader',
            // sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
            // ////////////////////////////////////////////////////////////////////////////////////
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.join(__dirname, '../node_modules/')
        // include: path.join(__dirname, '../src/'),
      }
    ]
  },
}
