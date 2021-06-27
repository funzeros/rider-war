<template>
  <div class="info my-battle-info" :class="'riderInstance' + value.id">
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
.my-battle-info {
  position: relative;
}
</style>
<style lang="scss">
.my-battle-msg-box {
  padding: 10px 10px 20px;
  background: #333;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  color: #fff;
  clip-path: polygon(
    0% 0%,
    100% 0%,
    100% calc(100% - 10px),
    calc(100% - 10px) calc(100% - 10px),
    calc(100% - 10px) 100%,
    calc(100% - 20px) calc(100% - 10px),
    0% calc(100% - 10px)
  );
  pointer-events: none;
  z-index: 2;
  opacity: 1;
  animation: scaleJump 100ms ease forwards, fadeOut 1s 1s ease-out forwards;
  transform-origin: right bottom;
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes scaleJump {
  from {
    transform: scale(0) translateX(calc(-100% + 20px));
  }
  to {
    transform: scale(1) translateX(calc(-100% + 20px));
  }
}
</style>
