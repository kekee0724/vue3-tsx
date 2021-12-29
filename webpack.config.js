const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  // mode: 'production',
  // entry: './src/index.js',
  entry: {
    app: path.join(__dirname, './src/index.js'),
  },
  output: {
    // filename: '[hash:8]-bundle.js',
    filename: 'bundle.js',
    path: path.join(__dirname, './build'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
    },
    compress: true,
    // port: 9000,
    // connectionBase: './build',
    hot: true,
    port: 3322,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(htm|html)$/,
        use: ['html-withimg-loader','raw-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico|webp)$/,
        use: ['file-loader'],
      },
    ],
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     title: 'webpack hello',
  //     filename: 'index.html',
  //     template: './src/index.html',
  //   }),
  // ],
};
