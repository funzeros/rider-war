import router from "./router";
import Performance from "@renderer/tools/performance";
import { useStore } from "./store";
import { UserActionsType } from "./store/modules/user/actions";

let end = null;
router.beforeEach(async (to, from, next) => {
  end = Performance.startExecute(`${from.path} => ${to.path} 路由耗时`); /// 路由性能监控
  // 路由守卫逻辑
  if (to.meta.auth) {
    const store = useStore();
    if (store.getters.token) {
      next();
    } else {
      const res = await store.dispatch(UserActionsType.TOKEN_AUTH);
      if (res) {
        next("/");
      } else {
        next("/login");
      }
    }
  } else {
    next();
  }
  setTimeout(() => {
    end();
  }, 0);
});

router.afterEach(() => {});
