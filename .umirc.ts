import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dva: {
    immer: true,
    hmr: false,
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  dynamicImport: {
    // loading: '@/components/Loading',
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  mfsu: {},
  // antd: {
  //   dark: true, // 开启暗色主题
  //   compact: true, // 开启紧凑主题
  // },
  proxy: {
    '/api': {
      target: 'http://public-api-v1.aspirantzhang.com/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  fastRefresh: {},
});
