<template>
  <div class="text-button">
    <div class="text-inner">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "GTextBtn",
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.text-button {
  font-size: 50px;
  font-weight: 600;
  color: #eeeeee;
  text-shadow: 0px 0px 0 #ddd, -1px -1px 0 #ccc, -2px -2px 0 #bbb,
    -3px -3px 0 #aaa, -4px -4px 0 #999, -5px -5px 0 #888, -6px -6px 0 #777,
    -7px -7px 0 #666, -8px -8px 0 #555, -9px -9px 0 #444, -10px -10px 0 #333,
    -11px -11px 0 #222, -12px -12px 0 #111, -13px -13px 12px rgba(0, 0, 0, 0.55),
    -13px -13px 1px rgba(0, 0, 0, 0.5);
  transform: skewY(-5deg) skewX(-5deg);
  letter-spacing: 10px;
  cursor: pointer;
  position: relative;
  .text-inner {
    position: relative;
    will-change: transform;
    transition: transform 100ms cubic-bezier(0, 0.8, 1, 2);
  }
  &::before {
    content: "";
    position: absolute;
    top: 10px;
    width: 0;
    left: -50px;
    height: 40px;
    background-image: linear-gradient(
      to right,
      rgba(#ff4, 0) 0%,
      rgba(#ff4, 0.8) 20%,
      rgba(#ff4, 0.8) 80%,
      rgba(#ff4, 0) 100%
    );
    transition: width 200ms ease-in-out;
    will-change: width;
  }
  &:hover {
    .text-inner {
      transform: translateX(10px);
      filter: sepia(80%);
    }
    &::before {
      width: calc(100% + 100px);
    }
  }
  &:active {
    .text-inner {
      transform: scale(0.9);
    }
  }
}
</style>