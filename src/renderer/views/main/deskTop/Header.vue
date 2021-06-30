<template>
  <div class="header-wrap">
    <div class="left">
      <template v-for="(item, i) of leftList" :key="'left-item-' + i">
        <el-divider direction="vertical" v-if="i > 0"></el-divider>
        <div>
          {{ item.value }}
        </div>
      </template>
    </div>
    <div class="center">
      <div>{{ versionInfo }}</div>
      <div>官方QQ群：<span @click="openPage()">908323661</span></div>
    </div>
    <div class="right">
      <template v-for="(item, i) of rightList" :key="'right-item-' + i">
        <el-divider direction="vertical" v-if="i > 0"></el-divider>
        <div>
          {{ item.value }}
        </div>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { userStatusDict } from "@renderer/const/user";
import { useStore } from "@renderer/store";
import { UserItemVO } from "@renderer/store/modules/common/state";
import { computed, defineComponent } from "vue";
import { versionInfo } from "@renderer/const/index";
const { shell } = require("electron");
export default defineComponent({
  setup() {
    const store = useStore();
    const leftList = computed(() => {
      return [
        {
          prop: "在线中",
          value:
            "在线中：" +
            store.getters.userList.filter(
              (m: UserItemVO) => m.status !== "offLine"
            ).length,
        },
        {
          prop: "匹配中",
          value:
            "匹配中：" +
            store.getters.userList.filter(
              (m: UserItemVO) => m.status === "matting"
            ).length,
        },
        {
          prop: "游戏中",
          value:
            "游戏中：" +
            store.getters.userList.filter(
              (m: UserItemVO) => m.status === "gaming"
            ).length,
        },
      ];
    });

    const rightList = computed(() => {
      return [
        {
          prop: "用户名",
          value: store.state.user.userInfo.name || "未登录",
        },
        {
          prop: "状态",
          value: userStatusDict[store.state.user.userStatus],
        },
      ];
    });
    const methods = {
      openPage() {
        const url =
          "https://qm.qq.com/cgi-bin/qm/qr?k=BVY7Uw2Xhi0KDGJj07oE9xAWYWyjDI4T&jump_from=webapi";
        shell.openExternal(url);
      },
    };

    return { rightList, leftList, ...methods, versionInfo };
  },
});
</script>
<style lang="scss" scoped>
.header-wrap {
  -webkit-app-region: drag;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 30px;
  background-image: linear-gradient(
    to top,
    rgba(#d5d4d0, 0.8) 0%,
    rgba(#d5d4d0, 0.8) 1%,
    rgba(#eeeeec, 0.8) 31%,
    rgba(#efeeec, 0.8) 75%,
    rgba(#e9e9e7, 0.8) 100%
  );
  line-height: 30px;
  font-size: 14px;
  padding: 0 15px;
  color: #333;
  display: flex;
  justify-content: space-between;
  .left,
  .right,
  .center {
    display: flex;
    align-items: center;
    text-align: center;
    width: 30%;
  }
  .right {
    flex-direction: row-reverse;
  }
  .el-divider {
    background-color: #aaa;
  }
  .center {
    justify-content: center;
    & > div:not(:first-of-type) {
      margin-left: 10px;
    }
    span {
      cursor: pointer;
      -webkit-app-region: no-drag;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
