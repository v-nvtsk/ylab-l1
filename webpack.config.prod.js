/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  target: 'browserslist',
  entry: './src/main.js',
  output: {
    clean: true, // Clean the output directory before emit.
    path: path.resolve(__dirname, 'prod'),
    filename: 'main-[fullhash].js',
    assetModuleFilename: 'assets/[name]-[fullhash][ext]'
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader"
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          minimize: true
        }
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: path.resolve(__dirname, './src/index.html'),
    filename: 'index.html'
  })],
  optimization: {
    minimize: true
  }
}