<template>
  <div class="opt-wrap">
    <div class="card-list">
      <GRiderCard
        class="card"
        :class="`${cardClassPrefix}${o}`"
        :value="riderObj[o]"
        v-for="o of value.handCards"
        :key="o"
        showAttr
        @mousedown.left="handleMD($event, o)"
      ></GRiderCard>
    </div>
    <MyInfo :value="value"></MyInfo>
    <div class="action-point grid-span-2">
      <Progress :value="value.currentAct" :maxValue="value.maxAct"></Progress>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType, reactive, toRefs } from "vue";
import Progress from "./Progress.vue";
import MyInfo from "./MyInfo.vue";
import { riderObj } from "@renderer/const/riders";
import { PlayerDTO } from "@renderer/types/game/dto";
import { gameGlobal } from "@renderer/hooks/useGame";
import useGAntiShake from "@renderer/hooks/useAntiShake";

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
  setup(props, ctx) {
    const { delayAS } = useGAntiShake();
    const modelData = reactive({
      startX: 0,
      startY: 0,
      cardClassPrefix: "hand-card-",
    });
    let raf = 0;
    let myCardAreaDom = null;
    const methods = {
      handleMD(e, cardId) {
        if (gameGlobal.canDrag) {
          modelData.startX = e.pageX;
          modelData.startY = e.pageY;
          gameGlobal.cardMoveX = e.pageX;
          gameGlobal.cardMoveY = e.startY;
          gameGlobal.isCardDrag = true;
          const el = document.querySelector(
            `.${modelData.cardClassPrefix}${cardId}`
          ) as HTMLElement;
          el.style["transition"] = "all 0s";
          this.outCardLoop(el);
          const myCardAreaDom = document.querySelector(
            ".my-card-area"
          ) as HTMLElement;
          myCardAreaDom.style.display = "block";
        }
        ctx.emit("chooseHandCard", cardId);
      },
      outCardLoop(el: HTMLElement) {
        if (gameGlobal.isCardDrag && gameGlobal.canDrag) {
          raf = requestAnimationFrame(() => {
            this.outCardLoop(el);
          });
          el.style["transform"] = `translate(${
            gameGlobal.cardMoveX - modelData.startX
          }px, ${gameGlobal.cardMoveY - modelData.startY}px) scale(1.1)`;
          delayAS(() => {
            const top = myCardAreaDom.parentElement.offsetTop,
              width = myCardAreaDom.parentElement.offsetWidth,
              left = myCardAreaDom.parentElement.offsetLeft,
              height = myCardAreaDom.parentElement.offsetHeight;
            const x = gameGlobal.cardMoveX,
              y = gameGlobal.cardMoveY;
            if (x > left && x < left + width && y > top && y < top + height) {
              myCardAreaDom.classList.remove("breath");
              myCardAreaDom.classList.add("active");
            } else {
              myCardAreaDom.classList.add("breath");
              myCardAreaDom.classList.remove("active");
            }
          }, 200);
        } else {
          cancelAnimationFrame(raf);
          el.style["transform"] = "";
          el.style["transition"] = "all 200ms 100ms ease-in-out";
        }
      },
    };
    onMounted(() => {
      myCardAreaDom = document.querySelector(".my-card-area") as HTMLElement;
    });
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
      will-change: transform;
      transition: all 200ms 100ms ease-in-out;
      &:hover {
        z-index: 9;
        transform: scale(1.1);
      }
    }
  }
}
</style>
