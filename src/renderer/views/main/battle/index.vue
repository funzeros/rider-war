<template>
  <div
    class="battle-wrap"
    :turnText="(actionFlag ? '你的回合' : '对方回合') + actTime + '秒'"
  >
    <!-- 对方状态区 -->
    <OpposeState class="oppose-state" :value="battleInfo.red"></OpposeState>
    <!-- 战斗区 -->
    <div class="cards-area">
      <CardsArea
        :value="battleInfo"
        :canDrag="actionFlag"
        @onAttackStart="handleOnAttackStart"
        @recycle="handleRecycle"
      ></CardsArea>
    </div>
    <!-- 我方操作区 -->
    <div class="our-opt">
      <OurOpt
        :value="battleInfo.blue"
        :canDrag="actionFlag"
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
    <el-progress
      class="right-progress"
      :percentage="percentage"
      :color="customColors"
      :show-text="false"
    ></el-progress>
    <el-progress
      class="left-progress"
      :percentage="percentage"
      :color="customColors"
      :show-text="false"
    ></el-progress>
    <canvas
      id="animationCanvas"
      :width="windowWidth"
      :height="windowHeight"
      :class="{ isAttackDrag }"
      v-show="isAttackDrag"
    ></canvas>
  </div>
</template>
<script lang="ts" >
import script from "./index.script";
export default script;
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
