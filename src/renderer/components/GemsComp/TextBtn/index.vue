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
  text-shadow: 0px 0px 1px #ddd, -1px -1px 1px #ccc, -2px -2px 1px #bbb,
    -3px -3px 1px #aaa, -13px -13px 12px rgba(0, 0, 0, 0.55),
    -13px -13px 1px rgba(0, 0, 0, 0.5);
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
    filter: blur(1px);
  }
  &:hover {
    .text-inner {
      transform: translateX(10px);
      color: lighten($color: #ff4, $amount: 30);
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