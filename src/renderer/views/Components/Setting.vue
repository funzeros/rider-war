<template>
  <teleport to="body">
    <div class="model setting-model" :class="{ dialogShow }" v-if="dialogShow">
      <div class="setting-wrap">
        <div class="close"></div>
      </div>
    </div>
  </teleport>
</template>
<script lang="ts">
import anime from "animejs";
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "setting",
  setup() {
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
          targets: ".model.setting-model",
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
    return {
      ...toRefs(modelData),
      ...methods,
    };
  },
});
</script>
<style lang="scss" scoped>
.model {
  padding: 30px;
  color: #2ef;
  display: flex;
  &.dialogShow {
    animation: scaleShow 100ms ease-in;
  }
  .setting-wrap {
    width: 400px;
    height: 400px;
    border-radius: 10px;
    background-color: rgba(#2ef, 0.2);
    box-shadow: 0 0 4px 2px rgba(#2ef, 0.8) inset;
    padding: 20px;
    position: relative;
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
