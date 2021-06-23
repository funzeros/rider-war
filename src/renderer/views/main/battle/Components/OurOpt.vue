<template>
  <div class="opt-wrap">
    <div class="card-list">
      <GRiderCard
        class="card"
        :class="`my-card-${o}`"
        :value="riderObj[o]"
        v-for="o of value.handCards"
        :key="o"
        showAttr
        @mousedown="handleMD($event, `.my-card-${o}`)"
      ></GRiderCard>
    </div>
    <MyInfo :value="value"></MyInfo>
    <div class="action-point grid-span-2">
      <Progress :value="value.currentAct" :maxValue="value.maxAct"></Progress>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from "vue";
import Progress from "./Progress.vue";
import MyInfo from "./MyInfo.vue";
import { riderObj } from "@renderer/const/riders";
import { PlayerDTO } from "@renderer/types/game/dto";
import { gameGlobal } from "@renderer/hooks/useGame";
export default defineComponent({
  props: {
    value: {
      type: Object as PropType<PlayerDTO>,
      default: new PlayerDTO(),
    },
  },
  components: {
    Progress,
    MyInfo,
  },
  setup() {
    const modelData = reactive({
      startX: 0,
      startY: 0,
    });
    let raf = 0;
    const methods = {
      handleMD(e, b) {
        if (gameGlobal.canDrag) {
          modelData.startX = e.pageX;
          modelData.startY = e.pageY;
          gameGlobal.cardMoveX = e.pageX;
          gameGlobal.cardMoveY = e.startY;
          gameGlobal.isCardDrag = true;
          const el = document.querySelector(b);
          el.style["transition"] = "all 0s";
          this.outCardLoop(el);
        }
      },
      outCardLoop(el) {
        if (gameGlobal.isCardDrag && gameGlobal.canDrag) {
          raf = requestAnimationFrame(() => {
            this.outCardLoop(el);
          });
          el.style["transform"] = `translate(${
            gameGlobal.cardMoveX - modelData.startX
          }px, ${gameGlobal.cardMoveY - modelData.startY}px) scale(1.1)`;
        } else {
          cancelAnimationFrame(raf);
          el.style["transform"] = "";
          el.style["transition"] = "all 10ms  ease-in-out";
        }
      },
    };
    return { riderObj, ...toRefs(modelData), ...methods };
  },
});
</script>
<style lang="scss" scoped>
.opt-wrap {
  width: 100%;
  height: 100%;
  display: grid;
  gap: 5px;
  grid-template-columns: 1fr 200px;
  grid-template-rows: 1fr 15px;
  .card-list {
    display: flex;
    justify-content: center;
    align-items: center;
    & > div:not(:last-of-type) {
      margin-right: 20px;
    }
    .card {
      transition: all 10ms ease-in-out;
      &:hover {
        z-index: 9;
        transform: scale(1.1);
      }
    }
  }
}
</style>
