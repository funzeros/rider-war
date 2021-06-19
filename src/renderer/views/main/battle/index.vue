<template>
  <div class="battle-wrap">
    <!-- 对方状态区 -->
    <OpposeState class="oppose-state" :value="battleInfo.red"></OpposeState>
    <!-- 战斗区 -->
    <div class="cards-area">
      <CardsArea></CardsArea>
    </div>
    <!-- 我方操作区 -->
    <div class="our-opt">
      <OurOpt :value="battleInfo.blue"></OurOpt>
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
}
.oppose-state {
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
