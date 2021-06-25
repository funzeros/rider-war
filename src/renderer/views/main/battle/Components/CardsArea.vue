<template>
  <div class="area-wrap">
    <div class="placehoder"></div>
    <transition-group
      class="other"
      tag="div"
      @enter="enter"
      @before-enter="beforeEnter"
      @after-enter="afterEnter"
    >
      <RiderInstance
        v-for="(o, i) of otherRiders"
        :style="oStyle(otherRiders.length, i)"
        :key="o.id"
        :value="o"
        :data-name="o.id"
      ></RiderInstance>
    </transition-group>
    <transition-group
      class="my"
      tag="div"
      @enter="enter"
      @before-enter="beforeEnter"
      @after-enter="afterEnter"
    >
      <RiderInstance
        v-for="o of myRiders"
        :key="o.id"
        :value="o"
        canDrag
      ></RiderInstance>
      <div key="my-card-area" class="my-card-area breath"></div>
    </transition-group>
  </div>
</template>
<script lang="ts">
import { BattleDTO } from "@renderer/types/game/dto";
import anime from "animejs";
import { computed, defineComponent, PropType } from "vue";
import RiderInstance from "./RiderInstance.vue";
export default defineComponent({
  components: {
    RiderInstance,
  },
  props: {
    value: {
      type: Object as PropType<BattleDTO>,
      default: () => new BattleDTO(),
    },
  },
  setup(props) {
    const myRiders = computed(() => {
      return props.value.blue.riderCards;
    });
    const otherRiders = computed(() => {
      return props.value.red.riderCards;
    });
    const cssTemp = new Map();
    const methods = {
      oStyle(length: number, index: number) {
        const center = (length - 1) / 2;
        const offset = Math.floor(Math.abs(index - center));
        return {
          transform: `translateY(${Math.floor(-6 * Math.pow(offset, 2))}px)`,
        };
      },
      enter(el, done) {
        anime({
          targets: el,
          scale: [
            { value: 1.3, duration: 50 },
            { value: 1, duration: 200, delay: 50 },
          ],
          opacity: [{ value: 1, duration: 300 }],
          easing: "easeOutElastic(1, .8)",
          complete: () => {
            done();
          },
        });
      },
      beforeEnter(el) {
        if (el.dataset.name) cssTemp.set(el.dataset.name, el.style.cssText);
        el.style["transition"] = "all 0s";
        el.style.opacity = 0;
      },
      afterEnter(el) {
        el.style["transition"] = "all 0.2s";
        el.style.opacity = 1;
        el.style.transform = "";
        if (el.dataset.name) el.style.cssText += cssTemp.get(el.dataset.name);
      },
    };
    return { otherRiders, myRiders, ...methods };
  },
});
</script>
<style lang="scss" scoped>
.area-wrap {
  width: 100%;
  height: 100%;
  background-color: gray;
  display: grid;
  grid-template-rows: 110px 1fr 1fr;
  .other,
  .my {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
}
.my-card-area {
  display: none;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 8;
  &.active {
    box-shadow: 0 0 40px 0 #9f9 inset, 0 0 2px 2px #9f9 inset;
  }
}
.breath {
  box-shadow: 0 0 40px 0 #fff inset, 0 0 2px 2px #fff inset;
}
.rider-instance {
  will-change: transform;
  transition: all 0.2s;
}
</style>
