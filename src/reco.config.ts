declare var window: Window & {
  client: Reco.Config.Client;
  server: Reco.Config.Server;
};
export const client: Reco.Config.Client = (window['client'] = {
  title: 'iPark+下载页面',
  techSupport: '上海拜特信息技术有限公司 版权所有',
  appName: 'iPark',
  appTitle: '园企互动平台',
  bgImg: "background-image: url('images/contentimg1.png')",
  bgColor: 'background-color: #02b8cd;',
  iosIndex: 0, // 新的下载模式
  // iosIndex: 1, // 旧的下载模式
});

export const server: Reco.Config.Server = (window['server'] = {
  apiKey: {
    apiKey: 'Bitech\\H5',
    secret: 'vgkEeveppBwCzPHr',
    responseType: 'mobile',
    grantType: 'authorization_mobile',
  },
  auth: {
    oauth2Url: 'authorization/oauth2',
    autoLogin: !0,
    autoRefreshToken: !0,
    anonymousLogin: !0,
  },
  userMobile: {
    aboutUsMobile: '021-23231080',
    adminPhone: '18002332204',
  },
  url: 'https://fat.bitechdevelop.com/reco-ipark-10-1-mobileapi/',
  AppDownUrl:
    'http://dev.bitech.cn/biparke01-v41-api/Operation/Operation/AppDown',
  assetsUrl: 'https://fat.bitechdevelop.com/reco-ipark-10-1-mobileapi/',
  // 旧的iOS跳转配置
  iosHref:
    'itms-services://?action=download-manifest&url=https://assets.bitech.cn/mobile/ios/ipark+/alphajava/index.html',
  andriodHref: '/src/assets/ipark.apk',
  // 跳转提示兑换已购
  todayUrl: 'https://apps.apple.com/cn/today',
  //跳转兑换
  redeemUrl: 'https://apps.apple.com/redeem/?code=PHJMK6ENP3TJ&ctx=apps',
});
