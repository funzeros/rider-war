<template>
  <div class="book-wrap">
    <div class="search"></div>
    <div class="scorll">
      <div class="list">
        <g-rider-card
          v-for="item of cards"
          :key="item.id"
          :value="item"
          @click="handleAdd(item)"
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
import { cardItemAddReq } from "@renderer/api/rw/card";
import { gMessage } from "@renderer/hooks/useMessage";
import { Rider } from "@renderer/types/rider/dto";
import { useStore } from "@renderer/store";
import { UserActionsType } from "@renderer/store/modules/user/actions";
import HeaderDiv from "@renderer/views/Components/Header.vue";

export default defineComponent({
  components: { HeaderDiv },
  setup() {
    const store = useStore();
    const constData = {
      cards: riderList,
    };
    const methods = {
      async handleAdd(item: Rider) {
        const { data, message } = await cardItemAddReq(item.id);
        if (data) {
          store.dispatch(UserActionsType.GET_CARD_LIST);
          gMessage("获取卡牌" + item.name, "success");
        } else gMessage(message, "error");
      },
    };
    const hasCardList = computed(() => {
      return store.state.user.cardList;
    });
    return {
      hasCardList,
      ...methods,
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
