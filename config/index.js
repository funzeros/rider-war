module.exports = {
  build: {
    DisableF12: true,
    env: require("./prod.env"),
    hotPublishUrl: "http://47.103.218.109:10088",
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
  IsUseSysTitle: true,
  BuiltInServerPort: 10050,
};
