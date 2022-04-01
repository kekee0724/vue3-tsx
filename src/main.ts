import 'ant-design-vue/dist/antd.css';
import 'highlight.js/styles/atelier-cave-dark.css';
import 'vite-plugin-vuedoc/style.css';
import './styles';
import '@/assets/css/common.less';

import { createApp } from 'vue';

import Antd from 'ant-design-vue';
import AntdMobile from 'antd-mobile-vue-next';
import { CopyOutlined, UserOutlined } from '@ant-design/icons-vue';

import { store } from '@levi-m/core';

import App from './App';
import router from './router';

const app = createApp(App);

app.config.warnHandler = (e) => {
  console.warn(e);
};
app.use(store);
app.use(router);
app.use(Antd);
app.use(AntdMobile);
app.component('UserOutlined', UserOutlined);
app.component('CopyOutlined', CopyOutlined);
app.mount('#app');

// if (location.pathname === '/') {
//   router.push('/install');
// }

export default app;
