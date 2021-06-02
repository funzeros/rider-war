<template>
  <div class="book-wrap">
    <div class="search"></div>
    <div class="scorll">
      <div class="list">
        <g-rider-card
          v-for="item of cards"
          :key="item.id"
          :value="item"
        ></g-rider-card>
      </div>
    </div>
    <g-back></g-back>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { riderList } from "@renderer/const/riders/index";
export default defineComponent({
  setup() {
    const constData = {
      cards: riderList,
    };
    return {
      ...constData,
    };
  },
});
</script>
<style lang="scss" scoped>
.book-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .search {
    height: 60px;
    background-color: beige;
  }
  .scorll {
    height: calc(100% - 60px);
    background-color: #cecece;
    overflow: scroll;
  }
  .list {
    box-sizing: border-box;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 100px);
    gap: 20px;
  }
}
</style>
