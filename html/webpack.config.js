const { resolve } = require('path');
/**
 * webpack配置文件
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
          'css-loader'
        ]
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
        ]
      }
    ]
  },
  // plugins的配置
  plugins: [
      // 详细plugins配置
  ],
  mode: 'development',
  // mode: 'production',
};
