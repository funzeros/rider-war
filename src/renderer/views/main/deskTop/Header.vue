<template>
  <div class="header-wrap">
    <div class="left">
      <template v-for="(item, i) of rightList" :key="'left-item-' + i">
        <el-divider direction="vertical" v-if="i > 0"></el-divider>
        <div :style="{ width: item.width }">
          <span v-if="item.label">{{ item.label }}：</span>
          <span>{{ item.value }}</span>
        </div>
      </template>
    </div>

    <div class="right">
      <template v-for="(item, i) of headInfoList" :key="'right-item-' + i">
        <el-divider direction="vertical" v-if="i > 0"></el-divider>
        <div :style="{ width: item.width }">
          <span v-if="item.label">{{ item.label }}：</span>
          <span>{{ item.value }}</span>
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

export default defineComponent({
  setup() {
    const store = useStore();
    const rightList = computed(() => {
      return [
        {
          prop: "用户名",
          value: store.state.user.userInfo.name,
        },
        {
          prop: "状态",
          value: userStatusDict[store.state.user.userStatus],
          width: "60px",
        },
        {
          prop: "在线中",
          label: "在线中",
          value: store.getters.userList.filter(
            (m: UserItemVO) => m.status !== "offLine"
          ).length,
        },
        {
          prop: "匹配中",
          label: "匹配中",
          value: store.getters.userList.filter(
            (m: UserItemVO) => m.status === "matting"
          ).length,
        },
        {
          prop: "游戏中",
          label: "游戏中",
          value: store.getters.userList.filter(
            (m: UserItemVO) => m.status === "gaming"
          ).length,
        },
      ];
    });

    const leftList = computed(() => {
      return [
        {
          prop: "用户名",
          value: store.state.user.userInfo.name,
        },
        {
          prop: "状态",
          value: userStatusDict[store.state.user.userStatus],
          width: "60px",
        },
        {
          prop: "在线中",
          label: "在线中",
          value: store.getters.userList.filter(
            (m: UserItemVO) => m.status !== "offLine"
          ).length,
        },
        {
          prop: "匹配中",
          label: "匹配中",
          value: store.getters.userList.filter(
            (m: UserItemVO) => m.status === "matting"
          ).length,
        },
        {
          prop: "游戏中",
          label: "游戏中",
          value: store.getters.userList.filter(
            (m: UserItemVO) => m.status === "gaming"
          ).length,
        },
      ];
    });

    return { rightList, leftList };
  },
});
</script>
<style lang="scss" scoped>
.header-wrap {
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
  font-size: 16px;
  color: #333;
  display: flex;
  padding: 0 15px;
  .left,
  .right {
    display: flex;
    align-items: center;
    & > div:not(:first-of-type) {
      margin-right: 10px;
      text-align: center;
    }
  }

  .right {
    flex-direction: row-reverse;
  }
}
</style>
