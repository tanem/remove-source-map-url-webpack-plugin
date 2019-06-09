import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import webpack from 'webpack'
import RemoveSourceMapUrlWebpackPlugin from '../../src'

const config: webpack.Configuration = {
  devtool: 'source-map',
  entry: path.resolve(__dirname, './index.js'),
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader']
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new RemoveSourceMapUrlWebpackPlugin()
  ]
}

export default config
