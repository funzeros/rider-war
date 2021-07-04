<template>
  <div class="book-wrap">
    <div class="search"></div>
    <div class="scorll">
      <div class="list">
        <g-rider-card
          v-for="item of cards"
          :key="item.id"
          :value="item"
          :class="{ blur: !hasCardList.includes(item.id) }"
        ></g-rider-card>
      </div>
    </div>
    <HeaderDiv isBack />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { riderList } from "@renderer/const/riders/index";
import { useStore } from "@renderer/store";
import HeaderDiv from "@renderer/views/Components/Header.vue";
export default defineComponent({
  components: { HeaderDiv },
  setup() {
    const store = useStore();
    const constData = {
      cards: riderList,
    };
    const hasCardList = computed(() => {
      return store.state.user.cardList;
    });
    return {
      hasCardList,
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
  padding: 30px 0 0;
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
.blur {
  filter: blur(5px);
}
</style>
