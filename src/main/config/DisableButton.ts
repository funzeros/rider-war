import { globalShortcut } from "electron";
import config from "@config/index";

export default {
  Disablef12() {
    if (process.env.NODE_ENV === "production" && config.DisableF12) {
      globalShortcut.register("f12", () => {
        console.log("用户试图启动控制台");
      });
    }
  },
  Disablef5() {
    if (process.env.NODE_ENV === "production" && config.DisableF5) {
      globalShortcut.register("f5", () => {
        console.log("用户试图刷新页面");
      });
    }
  },
};
