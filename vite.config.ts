import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import config from './src/config'

const env = process.argv[process.argv.length - 1]
const base = config[env]
console.log('process:::env', base)
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3030,
    open: true
  },
  plugins: [react()]
})
