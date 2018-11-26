'use strict'
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = require('./webpack.base.config')({
  entry: {
  },
  output: {
    publicPath: '/',
    filename: 'assets/bundle.js',
    chunkFilename: 'assets/[name].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(md)$/,
        loader: 'html-loader!markdown-loader'
      },
      {
        test: /\.(pdf|png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: './static/img/[name].[ext]?[hash]'
        }
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    inline: true,
    quiet: true,
    host: '0.0.0.0',
    disableHostCheck: true,
    historyApiFallback: true,
    // contentBase: ['template/dev', 'dist', 'public'],
    port: process.env.npm_config_port || 4200,
    stats: {
      chunks: false,
      children: false
    }
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'template/index.html',
      inject: true
    })
  ]
})
