const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

process.env.NODE_ENV = 'production';
/**
 * webpack配置文件
 * loader：1. 下载 2. 使用（配置loader）
 * plugins： 1. 下载 2.引入 3.使用
 */
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/index.js',
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
          // 'style-loader',
          // 这个loader取代style-loader。作用：提取css成单独文件
          MiniCssExtractPlugin.loader,
          // 将css文件变成commonjs模块加载到js中，内容是样式字符串
          'css-loader',
          /**
           *
           * css兼容性处理：postcss --> postcss-loader@3.0.0 postcss-preset-env@6.7.0
           * 帮postcss找到package.json中browerserslist里面的配置，通过配置加载指定的css兼容性样式
           */
          // 'postcss-loader',
          // 修改loader配置
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                // postcss的插件
                require('postcss-preset-env')(),
              ],
            },
          },
        ],
      },
      {
        // 匹配哪些文件
        test: /\.less$/,
        // 使用哪些loader进行处理
        use: [
          // 创建style标签，将js中的样式资源插入进行，添加到header中生效
          // 'style-loader',
          // 这个loader取代style-loader。作用：提取css成单独文件
          MiniCssExtractPlugin.loader,
          // 将css文件变成commonjs模块加载到js中，内容是样式字符串
          'css-loader',
          // 将less文件编译成css
          // 需要下载less-loader和less
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                // postcss的插件
                require('postcss-preset-env')(),
              ],
            },
          },
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
          name: '[hash:10].[ext]',
          outputPath: 'assets/images',
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
      {
        // 排除css/js/html资源
        exclude: /\.(css|js|html|less|jpg|png|gif|svg|json)$/,
        // 使用一个loader进行处理
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'assets/media',
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
    // 默认输出到main.css
    new MiniCssExtractPlugin({
      filename: 'assets/css/index.css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
  ],
  mode: 'development',
  // mode: 'production',
  // 开发服务器devServer：用来自动化（自动编译，自动打开浏览器，自动刷新浏览器
  // 特点：只会在内存中编译打包，不会有输出
  // 启动devServer指令为：npx webpack-dev-server
  devServer: {
    // 项目构建后路径
    contentBase: resolve(__dirname, 'build'),
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 2233,
    // 自动打开浏览器
    open: true,
  },
};
