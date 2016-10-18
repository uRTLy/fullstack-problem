var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: "./react-app/app.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "app.js",
    publicPath: "/js/"
    },
  devServer: { inline: true },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["es2015", "react"],
          plugins: ["transform-object-rest-spread"]
        }
      }
    ]
  },
};
