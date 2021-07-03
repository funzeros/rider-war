<template>
  <div class="card-group-wrap">
    <HeaderDiv isBack />
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
  padding: 30px 0 0;
  height: 100%;
}
</style>
