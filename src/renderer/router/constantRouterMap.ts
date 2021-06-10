import { RouteRecordRaw } from "vue-router";
import { isMeta } from "./util";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@renderer/views/404.vue"),
  },
  {
    path: "/version",
    name: "系统版本",
    meta: isMeta(),
    component: () => import("@renderer/components/LandingPage.vue"),
  },
  {
    path: "/",
    name: "首页",
    meta: isMeta(),
    redirect: "/main",
  },
  {
    path: "/main",
    name: "主页",
    meta: isMeta(),
    redirect: "/main/desk_top",
    component: () => import("@renderer/views/main/index.vue"),
    children: [
      {
        path: "desk_top",
        name: "主菜单",
        meta: isMeta(),
        component: () => import("@renderer/views/main/deskTop/index.vue"),
      },
      {
        path: "book",
        name: "图鉴",
        meta: isMeta(),
        component: () => import("@renderer/views/main/book/index.vue"),
      },
      {
        path: "battle/:id",
        name: "战斗",
        meta: isMeta(true),
        props: true,
        component: () => import("@renderer/views/main/battle/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "登录",
    meta: isMeta(),
    component: () => import("@renderer/views/main/login/index.vue"),
  },
];

export default routes;
