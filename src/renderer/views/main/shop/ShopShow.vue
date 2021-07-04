<template>
  <teleport to="body">
    <div class="model show-model" v-if="dialogShow">
      <div class="wrap">
        <transition-group
          class="other other-card-area"
          tag="div"
          @enter="enter"
          @before-enter="beforeEnter"
          @after-enter="afterEnter"
        >
          <GRiderCard
            v-for="item of list"
            :key="item.id"
            :value="riderObj[item.id]"
          />
        </transition-group>
      </div>
      <div class="btn" @click="handleGet()">开心收下</div>
    </div>
  </teleport>
</template>
<script lang="ts">
import { riderObj } from "@renderer/const/riders";
import anime from "animejs";
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  name: "ShopShow",
  setup() {
    const modelData = reactive<{
      dialogShow: boolean;
      list: GObj[];
    }>({ dialogShow: false, list: [] });
    const methods = {
      open(list: GObj[]) {
        modelData.dialogShow = true;
        setTimeout(() => {
          modelData.list = list;
        }, 200);
      },
      close() {
        modelData.dialogShow = false;
        modelData.list = [];
      },
      handleGet() {
        this.close();
      },
      beforeEnter(el: HTMLElement) {},
      enter(el: HTMLElement, done: Fn) {
        anime({
          targets: el,
          rotateY: 720,
          easing: "easeOutElastic(1, .8)",
          complete: () => {
            done();
          },
        });
      },
      afterEnter(el: HTMLElement) {},
    };
    return {
      riderObj,
      ...methods,
      ...toRefs(modelData),
    };
  },
});
</script>
<style lang="scss" scoped>
.show-model {
  .wrap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .btn {
    position: absolute;
    bottom: 10vh;
    margin: auto;
    cursor: pointer;
    width: 220px;
    height: 50px;
    padding: 10px;
    text-align: center;
    line-height: 30px;
    border-radius: 25px;
    background: rgb(58, 255, 101);
    font-size: 30px;
    text-shadow: 0 0 1px #000, 0 0 2px #000, 0 0 3px #000;
    color: #ffffff;
    font-weight: 600;
  }
}
</style>