<template>
  <div class="main-wrap">
    <!-- <video muted="" autoplay="" preload="" loop="">
      <source
        src="//game.gtimg.cn/images/lol/act/a20210601luckysummer/ui/header-kv2.mp4"
      />
    </video> -->
    <div class="btn-grid">
      <el-button
        v-for="(item, index) of btnListCp"
        :key="'btn_' + index"
        :class="[`grid-span-${item.span}`]"
        @click="item.func"
        >{{ item.name }}</el-button
      >
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { toComputeds } from "@renderer/utils/common";
import { useStore } from "@renderer/store";
import { UserActionsType } from "@renderer/store/modules/user/actions";
import { useGRoute } from "@renderer/hooks/useRoute";
import { useGConfirm } from "@renderer/hooks/useMessage";
export default defineComponent({
  setup() {
    const store = useStore();
    const { pushRouteName } = useGRoute();
    const { gConfirmTip } = useGConfirm();
    const methods = {};
    const constData = {
      btnList: [
        {
          name: "在线匹配",
          span: "2",
          func: () => {
            store.dispatch(UserActionsType.MATE_DOING);
          },
          hidden: () => {
            return !(store.getters.token && store.getters.rwws);
          },
        },
        {
          name: "尝试连接",
          span: "2",
          func: () => {
            store.dispatch(UserActionsType.INIT_WS);
          },
          hidden: () => {
            return !(store.getters.token && !store.getters.rwws);
          },
        },
        {
          name: "单机模式",
          span: "2",
          hidden: true,
        },
        {
          name: "我的物品",
          span: "2",
          hidden: true,
        },
        {
          name: "骑士图鉴",
          func: () => {
            pushRouteName("图鉴");
          },
          span: "2",
        },
        {
          name: "退出登录",
          span: "2",
          hidden: () => {
            return !store.getters.token;
          },
          func: async () => {
            const res = await gConfirmTip("是否退出登录");
            if (res) store.dispatch(UserActionsType.LOG_OUT);
          },
        },
        {
          name: "前往登录",
          span: "2",
          hidden: () => {
            return !!store.getters.token;
          },
          func: () => {
            pushRouteName("登录");
          },
        },
      ],
    };
    const computeds = toComputeds({
      btnListCp() {
        return constData.btnList.filter((m) => {
          if (!m.hidden) return true;
          if (m.hidden instanceof Function) return !m.hidden();
          return !m.hidden;
        });
      },
    });
    onMounted(() => {
      if (!store.getters.token) {
        store.dispatch(UserActionsType.TOKEN_AUTH);
      }
    });
    return {
      ...methods,
      ...computeds,
      ...constData,
    };
  },
});
</script>
<style lang="scss" scoped>
.main-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background-color: #cecece;
  .btn-grid {
    position: absolute;
    left: 100px;
    top: 100px;
    width: 200px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    .el-button {
      margin: 0;
    }
  }
}
</style>