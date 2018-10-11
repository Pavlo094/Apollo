const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const baseConfig = require('./base.config.js');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(baseConfig, {
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'devBuild')
  },
  devServer: {
    contentBase: path.join(__dirname, 'devBuild'),
    port: 8080,
    open: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '/docs/handleReCaptchaLoaded.js'),
        to: path.join(__dirname, '/devBuild/handleReCaptchaLoaded.js')
      },
      { 
        from: path.join(__dirname, '/docs/index.html'),
        to: path.join(__dirname, '/devBuild/index.html'),
      },
    ])
  ],
  devtool: 'source-map'
})
