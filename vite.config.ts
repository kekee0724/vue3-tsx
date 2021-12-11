import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import config from './src/config'

const pathResolve = (pathStr: string) => {
  return path.resolve(__dirname, pathStr)
}

const env = process.argv[process.argv.length - 1]
const base = config[env]
console.log('process:::env', base)

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 2233,
    open: true
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
  optimizeDeps: {
    include: ['@ant-design/icons-vue']
  },
  // otherwise, may assets 404 or visit with index.html
  base: '/start-vue/',
  build: {
    target: 'es2015',
    outDir: 'build',
    assetsDir: 'assets',
    assetsInlineLimit: 2048,
    cssCodeSplit: true
  },
  plugins: [vue(), vueJsx()]
})
