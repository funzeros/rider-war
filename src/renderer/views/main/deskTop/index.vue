<template>
  <div class="main-wrap">
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
export default defineComponent({
  setup() {
    const store = useStore();
    const { pushRouteFullpath } = useGRoute();
    const methods = {};
    const constData = {
      btnList: [
        {
          name: "在线匹配",
          span: "2",
          hidden: () => {
            return !store.getters.token;
          },
        },
        {
          name: "单机模式",
          span: "2",
        },
        {
          name: "我的物品",
          span: "2",
          hidden: () => {
            return !store.getters.token;
          },
        },
        {
          name: "骑士图鉴",
          func: () => {
            pushRouteFullpath("/book");
          },
          span: "2",
        },
        {
          name: "退出登录",
          span: "2",
          hidden: () => {
            return !store.getters.token;
          },
          func: () => {
            store.dispatch(UserActionsType.LOG_OUT);
          },
        },
        {
          name: "前往登录",
          span: "2",
          hidden: () => {
            return !!store.getters.token;
          },
          func: () => {
            pushRouteFullpath("/login");
          },
        },
      ],
    };
    const computeds = toComputeds({
      btnListCp() {
        return constData.btnList.filter((m) => {
          return !(m.hidden && m.hidden());
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