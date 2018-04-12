path = require("path");
webpack = require("webpack");
HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, "./docs/"),
  entry: ["./index.tsx"],
  output: {
    path: path.resolve(__dirname, "build/docs"),
    publicPath: "/",
    filename: "[name].js"
  },
  devServer: {
    contentBase: path.join(__dirname, "./public/"),
    port: 9000,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader"
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      inject: true,
      template: "../public/index.html"
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    modules: ["node_modules"],
    extensions: [
      ".mjs",
      ".web.ts",
      ".ts",
      ".web.tsx",
      ".tsx",
      ".web.js",
      ".js",
      ".json",
      ".web.jsx",
      ".jsx"
    ]
    // alias: {
    //   "@dcos/ui-kit": path.resolve(__dirname)
    //   // "@docs/ui-kit$": path.resolve(__dirname, "components/index.tsx")
    // }
  }
};
