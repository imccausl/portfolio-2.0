const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: `${__dirname}/dev`,
  devtool: 'eval-cheap-module-source-map',
  entry: {
    app: './js/app.js',
  },
  output: {
    path: `${__dirname}/dev/js`,
    filename: './js/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/dev/index.ejs`,
      filename: 'index.html',
      hash: true,
    }),
  ],
};
