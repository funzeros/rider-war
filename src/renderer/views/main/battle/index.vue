<template>
  <div class="battle-wrap">
    <!-- 对方状态区 -->
    <OpposeState class="oppose-state"></OpposeState>
    <!-- 战斗区 -->
    <div class="cards-area">
      <CardsArea></CardsArea>
    </div>
    <!-- 我方操作区 -->
    <div class="our-opt">
      <OurOpt></OurOpt>
    </div>
    <!--TODO:临时返回，完成后删除  -->
    <g-back></g-back>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import OurOpt from "./Components/OurOpt.vue";
import CardsArea from "./Components/CardsArea.vue";
import OpposeState from "./Components/OpposeState.vue";

export default defineComponent({
  components: {
    OurOpt,
    CardsArea,
    OpposeState,
  },
  setup() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
.battle-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #ececec;
  display: grid;
  grid-template-rows: 1fr 180px;
  gap: 10px;
  position: relative;
}
.oppose-state {
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
