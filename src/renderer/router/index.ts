import { createRouter, createWebHistory } from "vue-router";
import routerMap from "./constantRouterMap";

export default createRouter({
  history: createWebHistory(),
  routes: routerMap,
});
