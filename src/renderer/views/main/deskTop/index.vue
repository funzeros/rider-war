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
import { defineComponent } from "vue";
import { toComputeds } from "@renderer/utils/common";
import { useGRoute } from "@renderer/hooks/useRoute";
export default defineComponent({
  setup() {
    const { pushRouteFullpath } = useGRoute();
    const methods = {};
    const constData = {
      btnList: [
        {
          name: "在线匹配",
          span: "2",
        },
        {
          name: "单机模式",
          span: "2",
        },
        {
          name: "我的物品",
          span: "2",
        },
        {
          name: "登录",
          span: "1",
          func: () => {
            pushRouteFullpath("/login");
          },
          hidden: () => {
            return false;
          },
        },
        {
          name: "注册",
          span: "1",
          func: () => {
            pushRouteFullpath("/login?is_reg=1");
          },
          hidden: () => {
            return false;
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
  background-color: silver;
  width: 100%;
  height: 100%;
  position: relative;
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