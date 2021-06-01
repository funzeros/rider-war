import axios from "axios";
import { wgaFn } from "./common";
import qs from "qs";
import { useStore } from "@renderer/store";
import { UserActionsType } from "@renderer/store/modules/user/actions";
import { gMessage } from "@renderer/hooks/useMessage";
const serves = axios.create({
  baseURL: process.env.BASE_API + "/api",
  timeout: 10000,
});

// 设置请求发送之前的拦截器
serves.interceptors.request.use(
  (config) => {
    // 设置发送之前数据需要做什么处理
    const store = useStore();
    const isToken = (config.headers || {}).isToken === false;
    const accessToken = store.getters.token;
    if (accessToken && !isToken) {
      config.headers["Authorization"] = "Bearer " + accessToken; // token
    }
    const time = Date.now();
    config.headers["WGA"] = wgaFn(time);
    if (config.method === "get") {
      config.paramsSerializer = function (params) {
        return qs.stringify(params, { arrayFormat: "brackets" });
      };
    }
    return config;
  },
  (err) => Promise.reject(err)
);

// 设置请求接受拦截器
serves.interceptors.response.use(
  (res) => {
    const store = useStore();
    if (![401, 200].includes(res.status)) {
      if (res.status === 404) {
        return { code: 1, message: "数据迷路了..." };
      } else {
        return { code: 1, message: "服务器繁忙..." };
      }
    }
    if ([401].includes(res.status)) {
      store.dispatch(UserActionsType.LOG_OUT);
    }
    return res.data;
  },
  (err) => {
    // 判断请求异常信息中是否含有超时timeout字符串
    if (err.message.includes("timeout")) {
      console.log("错误回调", err);
      gMessage("网络超时", "error");
    }
    if (err.message.includes("Network Error")) {
      console.log("错误回调", err);
      gMessage("服务端未启动，或网络连接错误", "error");
    }
    return Promise.reject(err);
  }
);

// 将serves抛出去
export default serves;
