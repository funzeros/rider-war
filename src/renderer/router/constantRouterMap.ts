import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@renderer/views/404.vue"),
  },
  {
    path: "/version",
    name: "总览",
    component: () => import("@renderer/components/LandingPage.vue"),
  },
  {
    path: "/",
    name: "首页",
    redirect: "/desk_top",
  },
  {
    path: "/desk_top",
    name: "主菜单",
    component: () => import("@renderer/views/main/deskTop/index.vue"),
  },
  {
    path: "/login",
    name: "登录",
    component: () => import("@renderer/views/main/login/index.vue"),
  },
];

export default routes;
