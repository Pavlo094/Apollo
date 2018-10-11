const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(baseConfig, {
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'docs')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    })
  ]
})
