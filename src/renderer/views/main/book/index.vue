<template>
  <div class="book-wrap">
    <div class="list">
      <g-rider-card
        v-for="(item, index) of cards"
        :key="'card_' + index"
        :value="item"
      ></g-rider-card>
    </div>
    <g-back></g-back>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const constData = {
      cards: [{}, {}],
    };
    return {
      ...constData,
    };
  },
});
</script>
