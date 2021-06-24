<template>
  <div class="battle-wrap" :turnText="actionFlag ? '你的回合' : '对方回合'">
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
    <!--TODO:临时返回，完成后删除  -->
    <g-back></g-back>
  </div>
</template>
<script lang="ts" >
import script from "./index.script";
export default script;
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
  &::before {
    pointer-events: none;
    content: attr(turnText);
    display: inline;
    color: rgba($color: #fff, $alpha: 0.1);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, calc(-50% - 42px));
    line-height: 0;
    font-size: 100px;
    font-weight: 900;
  }
}
.oppose-state {
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
