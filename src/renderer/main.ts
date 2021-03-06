import { createApp } from "vue";

import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import "./styles/index.scss";
import "./permission";
// icon
import "./styles/faceicon/iconfont.js";
import "./styles/faceicon/iconfont.css";
import "./styles/rw/iconfont.css";

import App from "./App.vue";
import router from "./router";
import { errorHandler } from "./error";
import { installIepComponents } from "./core/components";
import store from "./store";
import TitleBar from "./components/common/TitleBar.vue";
const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.use(store);
errorHandler(app);
installIepComponents(app);

// 全局引入 TitleBar 组件
app.component("TitleBar", TitleBar);

app.mount("#app");
