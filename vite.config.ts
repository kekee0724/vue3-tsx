import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

const pathResolve = (pathStr: string) => {
  return path.resolve(__dirname, pathStr)
}

export default defineConfig({
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
  plugins: [vue(), vueJsx()]
})
