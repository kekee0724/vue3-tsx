var client = {
  title: 'iPark+下载页面',
  techSupport: '上海拜特信息技术有限公司 版权所有',
  appName: 'iPark',
  appNameSup: '+',
  appTitle: '园企互动平台',
  bgImg: "background-image: url('images/contentimg1.png')",
  bgColor: 'background-color: #02b8cd;',
};

var server = {
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
  url: 'https://fat.bitechdevelop.com/reco-ipark-10-1-mobileapi/',
  productName: 'ipark+',
  versionType: '服务端',
  // 开发时apk文件放在如下目录
  // androidHref: '/src/assets/ipark.apk',
  // 打包后apk文件放在如下目录
  androidHref: './assets/ipark.apk',
  //跳转兑换
  redeemUrl: 'https://apps.apple.com/redeem',
};
