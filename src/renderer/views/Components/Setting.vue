<template>
  <teleport to="body">
    <div class="model setting-model" :class="{ dialogShow }" v-if="dialogShow">
      <div class="setting-wrap">
        <div class="inner">
          <el-select v-model="form.dpi" placeholder="请选择">
            <el-option
              v-for="item in dipMap"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="footer">
          <g-button type="pulse" @click="submit()">保存</g-button>
        </div>
        <i class="close el-icon-circle-close" @click="close()"></i>
      </div>
    </div>
  </teleport>
</template>
<script lang="ts">
import { dpiList } from "@renderer/const";
import anime from "animejs";
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
  toRefs,
} from "vue";
import { SettingDTO } from "@renderer/types/common/dto";
const { ipcRenderer } = require("electron");
export default defineComponent({
  name: "setting",
  setup() {
    const modelData = reactive({
      dialogShow: false,
      form: new SettingDTO(),
    });
    const dipMap = computed(() => {
      return dpiList.map((m) => ({
        label: m.width + "*" + m.height,
        value: JSON.stringify(m),
      }));
    });
    const methods = {
      esc(e) {
        if (e.keyCode === 27) {
          methods.close();
        }
      },
      open() {
        ipcRenderer.invoke("get-size");
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
      submit() {
        const { dpi } = modelData.form;
        if (dpi) {
          ipcRenderer.invoke("set-size", JSON.parse(dpi));
        }
      },
    };
    onMounted(() => {
      ipcRenderer.on("win-size", (e, row) => {
        modelData.form.dpi = JSON.stringify({
          width: row[0],
          height: row[1],
        });
      });
    });
    onUnmounted(() => {
      ipcRenderer.removeAllListeners("win-size");
    });
    return {
      ...toRefs(modelData),
      ...methods,
      dipMap,
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
    display: flex;
    flex-direction: column;
    .inner {
      flex: 1;
    }
    .footer {
      height: 60px;
    }
  }
}
.close {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 32px;
  cursor: pointer;
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
