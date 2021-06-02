import { RouteRecordRaw } from "vue-router";
import { isMeta } from "./util";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@renderer/views/404.vue"),
  },
  {
    path: "/version",
    name: "总览",
    meta: isMeta(),
    component: () => import("@renderer/components/LandingPage.vue"),
  },
  {
    path: "/",
    name: "首页",
    meta: isMeta(),
    redirect: "/desk_top",
  },
  {
    path: "/desk_top",
    name: "主菜单",
    meta: isMeta(),
    component: () => import("@renderer/views/main/deskTop/index.vue"),
  },
  {
    path: "/login",
    name: "登录",
    meta: isMeta(),
    component: () => import("@renderer/views/main/login/index.vue"),
  },
  {
    path: "/book",
    name: "图鉴",
    meta: isMeta(),
    component: () => import("@renderer/views/main/book/index.vue"),
  },
  {
    path: "/battle",
    name: "战斗",
    meta: isMeta(true),
    props: true,
    component: () => import("@renderer/views/main/battle/index.vue"),
  },
];

export default routes;
