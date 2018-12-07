'use strict'
// const path = require('path')
const webpack = require('webpack')
// const autoprefixer = require('autoprefixer')
// const CleanPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const basePath = __dirname + '/../'

module.exports = require('./webpack.base.config')({
  entry: {
    vendors: ['react']
  },
  output: {
    publicPath: '/',
    filename: 'assets/[name].[chunkhash].js',
    chunkFilename: 'assets/[name].chunk.[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            }
          ]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
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
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: {
        except: ['exports', 'require']
      }
    }),
    new CleanWebpackPlugin(['dist'], {
      root: basePath
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({name: ['vendor', 'runtime']}),
    new ExtractTextPlugin({
      filename: 'styles.[contenthash].css',
      allChunks: true
    })
  ]
})
