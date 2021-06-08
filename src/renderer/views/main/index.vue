<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  <Mate></Mate>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Mate from "./mate/index.vue";
export default defineComponent({
  name: "Main",
  components: { Mate },
});
</script>

<style>
</style>