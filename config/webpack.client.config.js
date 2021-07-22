const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const autoprefixer = require('autoprefixer')

const base = require('./webpack.base.config.js')
const isProduction = process.env.NODE_ENV === 'production'
const srcPath = path.resolve(process.cwd(), 'src')

module.exports = merge(base, {
  entry: {
    app: path.join(srcPath, 'client-entry.js')
  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: '/public',
    filename: isProduction ? '[name].[hash].js' : '[name].js',
    sourceMapFilename: isProduction ? '[name].[hash].js.map' : '[name].js.map'
  },
  resolve: {
    extensions: ['.js', '.vue']
  },
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         sourceMap: !isProduction
      //       }
      //     }
      //   ]
      // },
      // {
      //   test: /\.scss$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     'css-loader',
      //     'sass-loader'
      //   ]
      // }
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: (isProduction ? [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })  
  ] : [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new webpack.HotModuleReplacementPlugin()
  ])
})
