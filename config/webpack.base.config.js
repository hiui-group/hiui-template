'use strict'
const webpack = require('webpack')
const path = require('path')
// const autoprefixer = require('autoprefixer')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const Stylish = require('webpack-stylish')
const basePath = __dirname + '/../'

module.exports = options => {
  return Object.assign(options, {
    entry: Object.assign({
      site: ['whatwg-fetch', 'babel-polyfill', './src/app.js']
    }, options.entry),

    output: Object.assign({
      path: path.join(basePath, 'dist')
    }, options.output),

    devtool: options.devtool,

    resolve: Object.assign({
      modules: ['node_modules', './node_modules'],
      extensions: ['.jsx', '.js', '.json', '.png'],
      alias: {
        '~component': path.resolve(__dirname, '../src/component'),
        '~util': path.resolve(__dirname, '../src/util'),
        '~action': path.resolve(__dirname, '../src/action'),
        '~asset': path.resolve(__dirname, '../src/asset'),
        '~config': path.resolve(__dirname, '../src/config')
      }
    }, options.resolve),

    plugins: [
      new webpack.DefinePlugin({
        '__env__': JSON.stringify(process.env.NODE_ENV)
      }),
      new Stylish(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
    ].concat(options.plugins)
  })
}
