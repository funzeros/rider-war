<template>
  <teleport to="body">
    <div class="model exit-model" :class="{ dialogShow }" v-if="dialogShow">
      <div class="btn-group">
        <div
          class="btn"
          v-for="item of BtnList"
          :key="item.prop"
          :class="item.prop"
          @click="item.func"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
  </teleport>
</template>
<script lang="ts">
import { useStore } from "@renderer/store";
import { UserActionsType } from "@renderer/store/modules/user/actions";
import anime from "animejs";
import { defineComponent, reactive, toRefs } from "vue";
const { ipcRenderer } = require("electron");
export default defineComponent({
  name: "DialogExit",
  setup() {
    const store = useStore();
    const modelData = reactive({
      dialogShow: false,
    });
    const methods = {
      esc(e) {
        if (e.keyCode === 27) {
          methods.close();
        }
      },
      open() {
        modelData.dialogShow = true;
        document.addEventListener("keyup", methods.esc);
      },
      close() {
        anime({
          targets: ".model.exit-model",
          scale: 0,
          duration: 100,
          easing: "linear",
          complete: () => {
            modelData.dialogShow = false;
            document.removeEventListener("keyup", methods.esc);
          },
        });
      },
    };
    const BtnList = [
      {
        prop: "exit2desk",
        label: "退出至桌面",
        func: () => {
          ipcRenderer.invoke("window-close");
        },
      },
      {
        prop: "exit2title",
        label: "退出至标题",
        func: () => {
          methods.close();
          store.dispatch(UserActionsType.LOG_OUT);
        },
      },
      {
        prop: "cancel",
        label: "取消",
        func: methods.close,
      },
    ];
    return {
      ...toRefs(modelData),
      ...methods,
      BtnList,
    };
  },
});
</script>
<style lang="scss" scoped>
.model {
  --border-width: 10px;
  --pipe-width: 8px;
  .btn-group {
    position: relative;
    width: 100%;
    height: 120px;
    border: solid #fff;
    border-width: 4px 0 4px 0;
    background-color: rgba($color: #000000, $alpha: 0.8);
    box-sizing: content-box;
    &::before {
      content: "";
      background-color: gold;
      width: 100vw;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      clip-path: polygon(
        0% 0%,
        30% 0%,
        calc(35% + var(--pipe-width)) calc(100% - var(--border-width)),
        calc(65% - var(--pipe-width)) calc(100% - var(--border-width)),
        70% 0%,
        100% 0%,
        100% var(--border-width),
        calc(70% + var(--pipe-width)) var(--border-width),
        65% 100%,
        35% 100%,
        calc(30% - var(--pipe-width)) var(--border-width),
        0% var(--border-width)
      );
      z-index: 1;
      pointer-events: none;
    }
    .btn {
      color: #fff;
      font-weight: 600;
      font-size: 60px;
      text-align: center;
      line-height: 110px;
      background-color: rgba($color: #3e3, $alpha: 0.2);
      position: absolute;
      cursor: pointer;
      height: 110px;
      box-shadow: 0 0 80px 0 rgba($color: #fff, $alpha: 0.8) inset;
      &:hover {
        background-color: rgba($color: #3e3, $alpha: 0.4);
        box-shadow: 0 0 50px 0 rgba($color: #fff, $alpha: 0.8) inset;
      }
      &:active {
        box-shadow: 0 0 100px 0 rgba($color: #fff, $alpha: 0.8) inset;
      }
      &.exit2desk {
        top: 10px;
        left: 0;
        width: 35%;
        clip-path: polygon(
          0% 0%,
          calc(100% - 5vw - var(--pipe-width)) 0%,
          100% 100%,
          0 100%
        );
      }
      &.exit2title {
        top: 0px;
        left: 30%;
        width: 40%;
        clip-path: polygon(
          0% 0%,
          100% 0%,
          calc(100% - 5vw - var(--pipe-width)) 100%,
          calc(5vw + var(--pipe-width)) 100%
        );
      }
      &.cancel {
        top: 10px;
        left: 65%;
        width: 35%;
        clip-path: polygon(
          calc(5vw + var(--pipe-width)) 0%,
          100% 0%,
          100% 100%,
          0% 100%
        );
      }
    }
  }
  &.dialogShow {
    animation: scaleShow 100ms ease-in;
  }
}
@keyframes scaleShow {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
</style>