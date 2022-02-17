const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * webpack配置文件
 * loader：1. 下载 2. 使用（配置loader）
 * plugins： 1. 下载 2.引入 3.使用
 */
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    // __dirname当前目录绝对路径
    path: resolve(__dirname, 'build'),
  },
  // loader的配置
  module: {
    rules: [
      // 详细loader配置
      // 不同文件必须配置不同loader处理
      {
        // 匹配哪些文件
        test: /\.css$/,
        // 使用哪些loader进行处理
        use: [
          // 创建style标签，将js中的样式资源插入进行，添加到header中生效
          'style-loader',
          // 将css文件变成commonjs模块加载到js中，内容是样式字符串
          'css-loader',
        ],
      },
      {
        // 匹配哪些文件
        test: /\.less$/,
        // 使用哪些loader进行处理
        use: [
          // 创建style标签，将js中的样式资源插入进行，添加到header中生效
          'style-loader',
          // 将css文件变成commonjs模块加载到js中，内容是样式字符串
          'css-loader',
          // 将less文件编译成css
          // 需要下载less-loader和less
          'less-loader',
        ],
      },
      {
        // 匹配哪些文件
        test: /\.(jpg|png|gif|svg)$/,
        // 使用一个loader进行处理
        // 下载url-loader file-loader
        loader: 'url-loader',
        options: {
          limit: 1 * 1024,
          // 关闭url-loader的es6模块化，使用commonjs解析
          esModule: false,
          // [hash:10]取图片的hash前10位
          // [ext]取文件的原来扩展名
          name:'[hash:10].[ext]'
        },
      },
      {
        // 匹配哪些文件
        test: /\.html$/,
        // 使用一个loader进行处理
        // html-loader处理html的img图片（负责引入img，从而被url-loader进行处理）
        // 下载url-loader file-loader
        loader: 'html-loader',
        options: {
          limit: 1 * 1024,
        },
      },
    ],
  },
  // plugins的配置
  plugins: [
    // 详细plugins配置
    // html-webpack-plugin
    // 默认会创建一个空的html文件，自动引入打包输入的所有的资源（js/css）
    new HtmlWebpackPlugin({
      // 模版文件
      template: './src/index.html',
    }),
  ],
  mode: 'development',
  // mode: 'production',
};
