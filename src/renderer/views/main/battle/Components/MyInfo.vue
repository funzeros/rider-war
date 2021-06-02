<template>
  <div class="info">
    <el-descriptions column="1">
      <el-descriptions-item label="用户名">Gems</el-descriptions-item>
      <el-descriptions-item label="行动力">7/10</el-descriptions-item>
      <el-descriptions-item label="生命值">50</el-descriptions-item>
    </el-descriptions>
    <el-progress
      :text-inside="true"
      :stroke-width="26"
      :percentage="60"
      color="#cc1616"
      >30/50</el-progress
    >
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>
<style lang="scss" scoped>
.info {
  padding: 10px;
  border: 5px double #333;
  border-radius: 10px;
  margin-right: 5px;
}
.el-descriptions {
  :deep(.el-descriptions__body) {
    background-color: transparent;
  }
}
.el-progress {
  :deep(.el-progress-bar__outer) {
    background-color: #f8d4d4;
  }
}
</style>
