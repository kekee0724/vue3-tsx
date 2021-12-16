declare var window: Window & {
  client: Levi.Config.Client;
  server: Levi.Config.Server;
};
export const client: Levi.Config.Client = (window["client"] = {
  title: "可可Levi",
  Assets: {
    Js: [],
    Css: [],
  },
  /**
   * 是否显示项目中导航栏 true显示  false不显示
   */
  showheader: true,
  /**
   * app是否启用地图定位, 服务端设置后以服务端配置为准
   */
  openMapLocation: false,
  /**
   * 全局设置列表底部是否显示正在加载
   */
  showloading: true,
  /**
   * 底部tab设置
   */
  tabBar: {
    items: [
      {
        icon: "mobile mobile-ipark",
        title: "首页",
        key: "/index",
        type: "home",
      },
      {
        icon: "mobile mobile-service",
        title: "服务",
        key: "/service",
        type: "service",
      },
      {
        icon: "mobile mobile-discover",
        title: "发现",
        key: "/discover/0",
        type: "discover",
      },
      { icon: "mobile mobile-my", title: "我的", key: "/my", type: "my" },
    ],
  },
  mapKey: "32a27fb58b64adbf3846556e180e5134",
});

export const server: Levi.Config.Server = (window["server"] = {
  apiKey: {
    apiKey: "Bitech\\H5",
    secret: "vgkEeveppBwCzPHr",
  },
  userMobile: {
    aboutUsMobile: "021-23231080",
    adminPhone: "18002332204",
  },
  /**
   * 项目接口地址
   */
  url: "https://fat.bitechdevelop.com/reco-oa-10-1-mobileapi/", // 正在使用win
});
