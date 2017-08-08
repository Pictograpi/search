const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const BabiliPlugin = require("babili-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const DEFAULT_CONFIG = {
  entry: ["./src/index.js", "./src/style.scss"],
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].js"
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(["public"], {
      root: path.resolve(__dirname),
      verbose: true,
      dry: false
    }),
    new HtmlWebpackPlugin({
      title: "Pictograpi Search",
      hash: true,
      template: "./src/index.ejs"
    }),
    new ExtractTextPlugin("[name].css")
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|png|jpg|svg)$/,
        use: ["file-loader"]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            "css-loader?sourceMap",
            "resolve-url-loader",
            "sass-loader?sourceMap",
            "import-glob-loader"
          ],
          fallback: "style-loader"
        })
      }
    ]
  }
};

module.exports = (process.env.DEVELOPMENT && createDev()) || createBuild();

/**
 * Creates dev configuration.
 *
 * @returns {Object} Webpack configuration
 */
function createDev() {
  let config = Object.assign({}, DEFAULT_CONFIG);

  config.devtool = "inline-source-map";
  config.devServer = {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 8080,
    historyApiFallback: true
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

  config.plugins.push(new BabiliPlugin());
  config.plugins.push(
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  );

  return config;
}
