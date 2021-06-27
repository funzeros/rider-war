<template>
  <div class="state-wrap" :class="'riderInstance' + value.id">
    <div>
      <span>用户名</span>
      <div>{{ value.name }}</div>
    </div>
    <div>
      <span>生命值</span>
      <el-progress
        style="flex: 1"
        :text-inside="true"
        :stroke-width="26"
        :percentage="percentage"
        color="#cc1616"
      >
        {{ value.currentHP }}/{{ value.maxHP }}
      </el-progress>
    </div>
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
.el-progress {
  :deep(.el-progress-bar__outer) {
    background-color: #f8d4d4;
  }
}
</style>
