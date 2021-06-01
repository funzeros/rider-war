<template>
  <div class="rider-card">123</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GRiderCard",
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>
