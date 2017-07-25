const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const LessPluginGlob = require("less-plugin-glob");
const Dotenv = require("dotenv-webpack");
const DEFAULT_CONFIG = {
  entry: ["./src/index.js", "./src/style.less"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Pictograpi Collaborate",
      hash: true,
      template: "./src/index.ejs"
    }),
    new ExtractTextPlugin("[name].css"),
    new Dotenv()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|png|jpg)$/,
        use: ["file-loader"]
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader",
            {
              loader: "less-loader",
              options: {
                plugins: [LessPluginGlob],
                paths: [path.resolve(path.join(__dirname, "src"))]
              }
            }
          ]
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
    contentBase: path.join(__dirname, "dist"),
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

  return config;
}
