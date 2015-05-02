var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: {
    client: './src/main/jsx/client.jsx'
  },
  target: "web",
  devtool: 'inline-source-map',
  debug: true,
  watch: false,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: "scripts/[name]-bundled.js"
  },
  resolve: {
    modulesDirectories: ['bower_components', 'node_modules'],
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loader: "jsx-loader" }
    ],
    noParse: /\.min\.js/
  },
  plugins: [
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    ),
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery",
      _: "underscore"
    })
  ]
};
