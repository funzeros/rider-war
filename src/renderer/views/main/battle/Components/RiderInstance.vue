<template>
  <div class="rider-instance" :class="{ canDrag }">
    <div class="rider-inner">
      <el-image :src="value.url" fit="cover"></el-image>
      <div class="info"></div>
    </div>
    <div class="shadow"></div>
  </div>
</template>
<script lang="ts">
import { PropType } from "@vue/runtime-core";
export default {
  props: {
    value: {
      type: Object as PropType<RiderInstance>,
      required: true,
    },
    canDrag: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.rider-instance {
  width: 110px;
  height: 150px;
  background: #aaa;
  box-shadow: 0 0 4px 0 #fff, 0 0 1px 1px #223;
  position: relative;
  &:not(:first-of-type) {
    margin-left: 30px;
  }
  &.canDrag {
    cursor: pointer;
    &:hover {
      transform: scale(1.2);
      z-index: 9;
    }
  }
}
.rider-instance,
.rider-inner {
  border-radius: 50% / 50% 50% 25% 25%;
}
.rider-inner {
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .el-image {
    pointer-events: none;
  }
  .info {
    flex: 1;
    border-top: 2px solid;
    border-image: linear-gradient(#333, #999, #333) 30 30;
    background-image: linear-gradient(to right, #434343 0%, black 100%);
  }
}
.shadow {
  border-radius: 50% 50% 0 0 / 64% 64% 0 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 110px;
  pointer-events: none;
  box-shadow: 0 0 20px 4px #fff inset;
}
</style>