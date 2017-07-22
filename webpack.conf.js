const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DEFAULT_CONFIG = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Pictograpi Collaborate',
      hash: true
    })
  ],
  module: {
    loaders: []
  }
};

module.exports = (process.env.DEVELOPMENT && createDev()) ||
  createBuild();

/**
 * Creates dev configuration.
 * 
 * @returns {Object} Webpack configuration
 */
function createDev() {
  let config = Object.assign({}, DEFAULT_CONFIG);

  config.devtool = 'inline-source-map';
  config.devServer = {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080
  };

  return config;
}

/**
 * Craetes build configuration.
 * 
 * @returns {Object} Webpack configuration
 */
function createBuild() {
  let config = Object.assign({}, DEFAULT_CONFIG);

  return config;
}