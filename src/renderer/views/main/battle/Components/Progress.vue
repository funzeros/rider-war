<template>
  <div
    class="progress-wrap"
    :style="{ gridTemplateColumns: `repeat(${maxValue}, 1fr)` }"
  >
    <div
      v-for="o of maxValue"
      :key="o"
      :style="{ backgroundColor: o <= value ? '#ffff00' : '#eee' }"
    ></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    value: {
      type: Number,
      default: 0,
      required: true,
    },
    maxValue: {
      type: Number,
      default: 10,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
.progress-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: rgb(0, 53, 83);
  grid-template-rows: 1fr;
  display: grid;
  gap: 0 4px;
  box-sizing: border-box;
  padding: 4px;
  & > div {
    opacity: 0.8;
    transition: background-color 100ms linear;
  }
}
</style>
