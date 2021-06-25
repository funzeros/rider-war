<template>
  <div class="circular-text" ref="circularTextRef"><slot></slot></div>
</template>
<script lang="ts">
import { GMath } from "@renderer/utils/custom";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "CircularText",
  setup() {
    const circularTextRef = ref();
    onMounted(() => {
      const el = circularTextRef.value as HTMLElement;
      const text = el.textContent.split("");
      const center = (text.length - 1) / 2;
      el.textContent = "";
      text.forEach((m: string, i) => {
        const offset = i - center;
        const span = document.createElement("span");
        span.textContent = m;
        span.style.setProperty("display", `inline-block`);
        span.style.setProperty(
          "transform",
          `translateY(${Math.max(
            Math.pow(offset, 2) * 5 - 3 * Math.abs(offset),
            0
          )}px)  translateX(${
            -GMath.between(offset, [-2, 2])
              ? 0
              : -offset * Math.pow(offset, 2) * 0.2
          }px) rotateZ(${20 * offset}deg)`
        );

        el.appendChild(span);
      });
    });
    return { circularTextRef };
  },
});
</script>
<style lang="scss" scoped>
.circular-text {
  pointer-events: none;
  text-align: center;
  line-height: 0;
  letter-spacing: 2px;
}
</style>


