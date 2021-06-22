<template>
  <div class="info">
    <el-descriptions :column="1">
      <el-descriptions-item label="用户名">{{
        value.name
      }}</el-descriptions-item>
      <el-descriptions-item label="行动力"
        >{{ value.currentAct }}/{{ value.maxAct }}</el-descriptions-item
      >
      <el-descriptions-item label="生命值">{{
        value.currentHP
      }}</el-descriptions-item>
    </el-descriptions>
    <el-progress
      :text-inside="true"
      :stroke-width="26"
      :percentage="percentage"
      color="#cc1616"
    >
      {{ value.currentHP }}/{{ value.maxHP }}</el-progress
    >
  </div>
</template>
<script lang="ts">
import { PlayerDTO } from "@renderer/types/game/dto";
import { computed, defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    value: {
      type: Object as PropType<PlayerDTO>,
      default: new PlayerDTO(),
    },
  },
  setup(props) {
    const percentage = computed(() => {
      return Math.round((props.value.currentHP / props.value.maxHP) * 100);
    });
    return { percentage };
  },
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
