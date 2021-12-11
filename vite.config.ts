import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import config from './src/config'
import path from 'path'

const pathResolve = (pathStr: string) => {
  return path.resolve(__dirname, pathStr)
}
const env = process.argv[process.argv.length - 1]
const base = config[env]
console.log('process:::env', base)

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3030,
    open: true,
    // 请求代理
    proxy: {
      '/api': {
        // 当遇到 /api 路径时，将其转换成 target 的值，这里我们为了测试，写了新蜂商城的请求地址
        target: 'http://47.99.134.126:28019/api/v1',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '') // 将 /api 重写为空
      }
    },
  },
  resolve: {
    alias: {
      '~': pathResolve('./'), // 根路径
      '@': pathResolve('src'), // src 路径
      '@levi-m/core': pathResolve('src/core'), // core 路径
      '@levi-m/core-ui': pathResolve('src/core-ui'), // core-ui 路径
      '@levi-a': pathResolve('src/apps') // apps 路径
    }
  },
  plugins: [react()]
})
