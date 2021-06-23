<template>
  <div class="area-wrap">
    <div class="placehoder"></div>
    <div class="other">
      <div
        class="demo"
        :style="oStyle(9, i)"
        v-for="(o, i) of 9"
        :key="o"
      ></div>
    </div>
    <div class="my">
      <div class="demo" v-for="o of 9" :key="o"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const oStyle = (length, index) => {
      const center = length / 2;
      const offset = Math.floor(Math.abs(index - center));
      return {
        transform: `translateY(${-30 * offset}px)`,
      };
    };
    return { oStyle };
  },
});
</script>
<style lang="scss" scoped>
.area-wrap {
  width: 100%;
  height: 100%;
  background-color: gray;
  display: grid;
  grid-template-rows: 110px 1fr 1fr;
  .other,
  .my {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .my {
    &:hover {
      box-shadow: 0 0 40px 0px rgba($color: #fff, $alpha: 0.2) inset,
        0 0 1px 1px rgba($color: #fff, $alpha: 0.2) inset;
    }
  }
}
.demo {
  width: 100px;
  height: 120px;
  background: #fff;
  &:not(:first-of-type) {
    margin-left: 30px;
  }
}
</style>
