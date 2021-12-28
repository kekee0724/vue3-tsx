var client = {
  title: 'iPark+下载页面',
  techSupport: '上海拜特信息技术有限公司 版权所有',
  appName: 'iPark<sup>+</sup>',
  appTitle: '园企互动平台',
  bgImg: "background-image: url('images/contentimg1.png')",
  bgColor: 'background-color: #02b8cd;',
  iosIndex: 0, // 新的下载模式
  // iosIndex: 1, // 旧的下载模式
  productName: 'ipark+',
  versionType: '服务端',
  // 设置缓存过期时间 单位： 天
  expire: 1,
};

var server = {
  apiKey: {
    apiKey: 'Bitech\\H5',
    secret: 'vgkEeveppBwCzPHr',
    responseType: 'mobile',
    grantType: 'authorization_mobile',
  },
  userMobile: {
    aboutUsMobile: '021-23231080',
    adminPhone: '18002332204',
  },
  auth: {
    oauth2Url: 'authorization/oauth2',
    autoLogin: !0,
    autoRefreshToken: !0,
    anonymousLogin: !0,
  },
  AppDownUrl:
    'http://dev.bitech.cn/biparke01-v41-api/Operation/Operation/AppDown',
  assetsUrl: 'https://fat.bitechdevelop.com/reco-ipark-10-1-mobileapi/',
  url: 'https://fat.bitechdevelop.com/reco-ipark-10-1-mobileapi/',
  // 旧的iOS跳转配置
  iosHref:
    'itms-services://?action=download-manifest&url=https://assets.bitech.cn/mobile/ios/ipark+/alphajava/index.html',
  // 跳转提示兑换已购
  todayUrl: 'https://apps.apple.com/cn/today',
  //跳转兑换
  redeemUrl: 'https://apps.apple.com/redeem',
};

Storage.prototype.setExpire = (key, value, expire) => {
  let obj = {
    data: value,
    time: Date.now(),
    expire: expire,
  };
  //localStorage 设置的值不能为对象,转为json字符串
  localStorage.setItem(key, JSON.stringify(obj));
};

Storage.prototype.getExpire = (key) => {
  let val = localStorage.getItem(key);
  if (!val) {
    return val;
  }
  val = JSON.parse(val);
  if (Date.now() - val.time > val.expire) {
    localStorage.removeItem(key);
    return null;
  }
  return val.data;
};
