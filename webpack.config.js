module.exports = {
  context: __dirname + '/dev/js',
  entry: {
    app: './app.js',
  },
  output: {
    path: __dirname + '/dist/js',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }
    ],
  },
};