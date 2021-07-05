module.exports = {
  build: {
    env: require("./prod.env"),
    hotPublishUrl: "https://gems-oss.oss-cn-hangzhou.aliyuncs.com/RW",
    hotPublishConfigName: "latest.yml",
  },
  dev: {
    env: require("./dev.env"),
    removeElectronJunk: true,
    chineseLog: false,
    port: 9080,
  },
  DllFolder: "",
  HotUpdateFolder: "update",
  UseStartupChart: true,
  IsUseSysTitle: false,
  BuiltInServerPort: 10050,
};
