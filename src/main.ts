import 'ant-design-vue/dist/antd.css'
import '@/assets/css/index.scss'

import { createApp } from 'vue'

import Antd from 'ant-design-vue'

import { store } from '@/core'

import App from './App.vue'
import router from './router'

createApp(App).use(store).use(router).use(Antd).mount('#app')
