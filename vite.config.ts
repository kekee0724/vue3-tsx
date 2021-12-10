import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

const pathResolve = (pathStr: string) => {
  return path.resolve(__dirname, pathStr)
}

export default defineConfig({
  server: {
    port: 2233,
    open: true
  },
  resolve: {
    alias: {
      '@': pathResolve('src'),
      '@assets': pathResolve('src/assets'),
      '@components': pathResolve('src/components'),
      '@utils': pathResolve('src/utils'),
      '@router': pathResolve('src/router'),
      '@store': pathResolve('src/store')
    }
  },
  optimizeDeps: {
    include: ['@ant-design/icons-vue']
  },
  // otherwise, may assets 404 or visit with index.html
  base: '/start-vue3/',
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    assetsInlineLimit: 2048,
    cssCodeSplit: true
  },
  plugins: [vue(), vueJsx()]
})
