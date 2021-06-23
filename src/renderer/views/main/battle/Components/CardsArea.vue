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
    const oStyle = (length: number, index: number) => {
      const center = (length - 1) / 2;
      const offset = Math.floor(Math.abs(index - center));
      return {
        transform: `translateY(${Math.floor(-6 * Math.pow(offset, 2))}px)`,
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
