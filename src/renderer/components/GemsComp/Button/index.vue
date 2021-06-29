<template>
  <button :class="[type]"><slot></slot></button>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "GButton",
  props: {
    type: {
      type: String,
      default: "pulse",
    },
  },
  setup() {},
});
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
