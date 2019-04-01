const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.export = {
  entry: {
    app: './src/index.js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name:'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  devServer: {
    hot: true,
    compress: true,
    contentBase: path.join(__dirname, 'dist'),
    open: 'chrome'
  },
  watch: true,
  devtool: 'source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin,
    new MiniCssExtractPlugin({
      name: "style.css",
      chunkFilename: "[name].css"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader"
          },
          "sass-loader"
        ]
      }
    ]
  }
}