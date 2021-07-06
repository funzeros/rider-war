<template>
  <div class="card-group-wrap">
    <HeaderDiv isBack />
    <div class="inner"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import HeaderDiv from "@renderer/views/Components/Header.vue";

export default defineComponent({
  components: { HeaderDiv },
  setup() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
.card-group-wrap {
  padding: 80px 50px 50px;
  height: 100%;
  background-color: #e0e0e0;
  .inner {
    width: 100%;
    height: 100%;
    border-radius: 50px;
    background: #e0e0e0;
    box-shadow: inset 20px 20px 60px #bebebe, inset -20px -20px 60px #ffffff;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
