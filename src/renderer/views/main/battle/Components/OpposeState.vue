<template>
  <div class="state-wrap">
    <div>
      <span> 用户名 </span>
      <div>abcd</div>
    </div>
    <div>
      <span> 生命值 </span>
      <el-progress
        :text-inside="true"
        :stroke-width="26"
        :percentage="60"
        color="#cc1616"
      >
        30/50
      </el-progress>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
.state-wrap {
  width: 200px;
  height: 100px;
  display: flex;
  flex-direction: column;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 10px;
  border: 5px double #333;
  background-color: #ececec;
  & > div {
    display: flex;
    align-items: center;
    color: #666;
    height: 30px;
    span {
      color: #333;
      margin-right: 5px;
    }
    &:not(:last-of-type) {
      margin-right: 20px;
    }
  }
}
</style>
