const { resolve } = require('path')
const MiniExtractPlagin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/index.js',
  // mode: 'development',
  output: {
    filename: 'main.js',
    //path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.(png|jpeg|gif|mp3)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      },
      {
        test: /\.css$/i,
        use: [MiniExtractPlagin.loader, 'css-loader']
      },
      {
        test : /\.s[ac]ss$/i,
        use: [MiniExtractPlagin.loader, 'css-loader', 'sass-loader']
      }
    ]
  }
}