<template>
  <div class="main-wrap">
    <video class="video" muted="" autoplay="" preload="" loop="">
      <source :src="video.mp4_saber_01" />
    </video>
    <div class="btn-grid">
      <el-button
        v-for="(item, index) of btnListCp"
        :key="'btn_' + index"
        :class="[`grid-span-${item.span}`]"
        @click="item.func"
        >{{ item.name }}</el-button
      >
    </div>
    <el-dialog
      title="进度"
      v-model="dialogVisible"
      :before-close="handleClose"
      center
      width="14%"
      top="30vh"
      :show-close="false"
    >
      <div class="conten">
        <el-progress
          type="dashboard"
          :percentage="percentage"
          :color="colors"
          :status="progressStaus"
        ></el-progress>
        <el-link @click="handleDownLoad()">手动下载</el-link>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive, toRefs } from "vue";
import { toComputeds } from "@renderer/utils/common";
import { useStore } from "@renderer/store";
import { UserActionsType } from "@renderer/store/modules/user/actions";
import { useGRoute } from "@renderer/hooks/useRoute";
import { gMessage, useGConfirm } from "@renderer/hooks/useMessage";
import useGame from "@renderer/hooks/useGame";
import { video } from "@renderer/assets/resource";
import { ElMessageBox } from "element-plus";
const { ipcRenderer, shell } = require("electron");

export default defineComponent({
  setup() {
    const store = useStore();
    const { pushRouteName } = useGRoute();
    const { gConfirmTip } = useGConfirm();
    const { gameMatting } = useGame();
    const modelData = reactive<{
      percentage: number;
      progressStaus: string;
      colors: string | GObj[];
      filePath: string;
      updateStatus: string;
      dialogVisible: boolean;
    }>({
      percentage: 0,
      progressStaus: "",
      colors: [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#6f7ad3", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#5cb87a", percentage: 100 },
      ],
      filePath: "",
      updateStatus: "",
      dialogVisible: false,
    });
    const methods = {
      updateInit() {
        // // 下载文件的监听
        ipcRenderer.on("download-progress", (event, arg) => {
          modelData.percentage = Number(arg);
        });
        ipcRenderer.on("download-error", (event, arg) => {
          if (arg) {
            modelData.progressStaus = "exception";
            modelData.percentage = 40;
            modelData.colors = "#d81e06";
          }
        });
        ipcRenderer.on("download-paused", (event, arg) => {
          if (arg) {
            modelData.progressStaus = "warning";
            ElMessageBox.alert("下载由于未知原因被中断！", "提示", {
              confirmButtonText: "重试",
              callback: (action) => {
                ipcRenderer.invoke("satrt-download");
              },
            });
          }
        });
        ipcRenderer.on("download-done", (event, age) => {
          modelData.filePath = age.filePath;
          modelData.progressStaus = "success";
          ElMessageBox.alert("更新下载完成！", "提示", {
            confirmButtonText: "确定",
            callback: (action) => {},
          });
        });
        // electron-updater的更新监听
        ipcRenderer.on("UpdateMsg", (event, age) => {
          switch (age.state) {
            case -1:
              const msgdata = {
                title: "发生错误",
                message: age.msg,
              };
              modelData.dialogVisible = false;
              ipcRenderer.invoke("open-errorbox", msgdata);
              break;
            case 0:
              // gMessage("正在检查更新");
              break;
            case 1:
              gMessage("已检查到新版本，开始下载", "success");
              modelData.dialogVisible = true;
              break;
            case 2:
              // gMessage("无新版本", "success");
              break;
            case 3:
              modelData.percentage = age.msg.percent.toFixed(1);
              break;
            case 4:
              modelData.progressStaus = "success";
              ElMessageBox.alert("更新下载完成！", "提示", {
                confirmButtonText: "确定",
                callback: (action) => {
                  ipcRenderer.invoke("confirm-update");
                },
              });
              break;
            default:
              break;
          }
        });
        ipcRenderer.on("hot-update-status", (event, msg) => {
          modelData.updateStatus = msg.status;
        });
        // 更新检查
        ipcRenderer.invoke("check-update");
      },
      handleClose() {
        modelData.dialogVisible = false;
      },
      handleDownLoad() {
        shell.openExternal("http://aote.fun:10088");
      },
    };
    const constData = {
      btnList: [
        {
          name: "在线匹配",
          span: "2",
          func: () => {
            gameMatting("matting");
          },
          hidden: () => {
            return !(store.getters.token && store.getters.rwws);
          },
        },
        {
          name: "尝试连接",
          span: "2",
          func: () => {
            store.dispatch(UserActionsType.INIT_WS);
          },
          hidden: () => {
            return !(store.getters.token && !store.getters.rwws);
          },
        },
        {
          name: "单机模式",
          span: "2",
          hidden: true,
        },
        {
          name: "我的物品",
          span: "2",
          hidden: true,
        },
        {
          name: "骑士图鉴",
          func: () => {
            pushRouteName("图鉴");
          },
          span: "2",
        },
        {
          name: "退出登录",
          span: "2",
          hidden: () => {
            return !store.getters.token;
          },
          func: async () => {
            const res = await gConfirmTip("是否退出登录");
            if (res) store.dispatch(UserActionsType.LOG_OUT);
          },
        },
        {
          name: "前往登录",
          span: "2",
          hidden: () => {
            return !!store.getters.token;
          },
          func: () => {
            pushRouteName("登录");
          },
        },
      ],
    };
    const computeds = toComputeds({
      btnListCp() {
        return constData.btnList.filter((m) => {
          if (!m.hidden) return true;
          if (m.hidden instanceof Function) return !m.hidden();
          return !m.hidden;
        });
      },
    });
    onMounted(() => {
      methods.updateInit();
      if (!store.getters.token) {
        store.dispatch(UserActionsType.TOKEN_AUTH);
      }
    });
    onUnmounted(() => {
      ipcRenderer.removeAllListeners("confirm-message");
      ipcRenderer.removeAllListeners("download-done");
      ipcRenderer.removeAllListeners("download-paused");
      ipcRenderer.removeAllListeners("confirm-stop");
      ipcRenderer.removeAllListeners("confirm-start");
      ipcRenderer.removeAllListeners("confirm-download");
      ipcRenderer.removeAllListeners("download-progress");
      ipcRenderer.removeAllListeners("download-error");
    });
    return {
      ...methods,
      ...computeds,
      ...constData,
      ...toRefs(modelData),
      video,
    };
  },
});
</script>
<style lang="scss" scoped>
.main-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background-color: #cecece;
  .btn-grid {
    position: absolute;
    left: 100px;
    top: 100px;
    width: 200px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    .el-button {
      margin: 0;
    }
  }
}
.video {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  transform: scale(1.2);
}
.conten {
  text-align: center;
}
</style>
