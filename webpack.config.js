const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname + '/dev/js',
  devtool: 'eval-cheap-module-source-map',
  entry: {
    app: './app.js',
  },
  output: {
    path: __dirname + '/dev/js',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      }
    ],
  },
  plugins: [new HtmlWebpackPlugin(
    {
      template: __dirname + '/dev/app.html',
      filename: __dirname + '/dev/index.html',
      hash: true,
    }
  )],
};