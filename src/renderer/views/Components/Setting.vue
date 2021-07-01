<template>
  <teleport to="body">
    <div class="model setting-model" :class="{ dialogShow }" v-if="dialogShow">
      <div class="setting-wrap">
        <div class="header">设置</div>
        <div class="inner">
          <el-form :model="form" label-width="80px">
            <el-form-item label="分辨率" prop="dpi">
              <el-select v-model="form.dpi" placeholder="请选择">
                <el-option
                  v-for="item in dipMap"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否全屏" prop="fullScreen">
              <el-switch v-model="form.fullScreen" />
            </el-form-item>
          </el-form>
        </div>
        <div class="footer">
          <div class="button-primary" @click="submit()">保存</div>
          <div class="button" @click="close()">取消</div>
        </div>
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
        value: m.width + "*" + m.height,
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
        const { dpi, fullScreen } = modelData.form;
        ipcRenderer.invoke("set-max", fullScreen);
        if (dpi && !fullScreen) ipcRenderer.invoke("set-size", dpi);
        methods.close();
      },
    };
    onMounted(() => {
      ipcRenderer.on("win-size", (e, row) => {
        modelData.form.dpi = row.size[0] + "*" + row.size[1];
        modelData.form.fullScreen = row.fullScreen;
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
    background-color: rgba(#2ef, 0.4);
    box-shadow: 0 0 4px 2px rgba(#2ef, 0.8) inset;
    padding: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    .inner {
      flex: 1;
    }
    .footer {
      display: flex;
      justify-content: center;
      height: 40px;
    }
    .header {
      height: 50px;
      font-size: 24px;
      line-height: 30px;
      text-align: center;
    }
  }
}

.el-form-item {
  :deep(.el-form-item__label) {
    color: #fff;
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
