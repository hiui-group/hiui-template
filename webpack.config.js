const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: {
    'hi-request': './src/index.js',
    'hi-request.min': './src/index.js'
  },
  output: {
    filename: '[name].js',
    library: 'HiRequest',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  mode: 'none',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/
      })
    ]
  }
}
