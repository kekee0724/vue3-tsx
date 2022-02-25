import path from 'path';
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

// import config from './src/config';

const pathResolve = (pathStr: string) => {
  return path.resolve(__dirname, pathStr)
}
// const env = process.argv[process.argv.length - 1]
// const base = config[env]
// console.log('process:::env', base)

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3030,
    open: true,
    // 请求代理
    proxy: {
      '/api': {
        // 当遇到 /api 路径时，将其转换成 target 的值
        target: 'http://192.168.1.220/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '') // 将 /api 重写为空
      }
    }
  },
  base: "./",
  resolve: {
    alias: {
      '~': pathResolve('./'), // 根路径
      '@': pathResolve('src'), // src 路径
      '@reco-m/core': pathResolve('src/core'), // core 路径
      '@reco-m/core-ui': pathResolve('src/core-ui'), // core-ui 路径
      "@reco-m/home": pathResolve('src/apps/home'),
    }
  },
  plugins: [react(),]
})
