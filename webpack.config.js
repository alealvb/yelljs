const path = require('path');

module.exports = {
  target: 'node',
  context: path.resolve(__dirname, 'src'),
  entry: './yell.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs',
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  devServer: {
    open: true,
    inline: true,
    openPage: '',
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: './dist',
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
};
