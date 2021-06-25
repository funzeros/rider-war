<template>
  <div
    class="battle-wrap"
    :turnText="(actionFlag ? '你的回合' : '对方回合') + actTime + '秒'"
  >
    <!-- 对方状态区 -->
    <OpposeState class="oppose-state" :value="battleInfo.red"></OpposeState>
    <!-- 战斗区 -->
    <div class="cards-area">
      <CardsArea :value="battleInfo"></CardsArea>
    </div>
    <!-- 我方操作区 -->
    <div class="our-opt">
      <OurOpt
        :value="battleInfo.blue"
        @chooseHandCard="chooseHandCard"
      ></OurOpt>
    </div>
    <div
      class="next-turn"
      :class="{ disabled: !actionFlag }"
      @click="handleNextTurn()"
    >
      {{ actionFlag ? "结束回合" : "对方回合" }}
    </div>
    <div class="this-turn">第{{ round }}回合</div>
    <!--TODO:临时返回，完成后删除  -->
    <g-back></g-back>
  </div>
</template>
<script lang="ts" >
import script from "./index.script";
export default script;
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
