<template>
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
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive, toRefs } from "vue";
import { ElMessageBox } from "element-plus";
import { gMessage } from "@renderer/hooks/useMessage";
const { ipcRenderer, shell } = require("electron");

export default defineComponent({
  name: "DialogUpdate",
  setup() {
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
        // ipcRenderer.invoke("hot-update");
      },
      handleClose() {
        modelData.dialogVisible = false;
      },
      handleDownLoad() {
        shell.openExternal("http://aote.fun:10088");
      },
    };
    onMounted(() => {
      methods.updateInit();
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
      ...toRefs(modelData),
      ...methods,
    };
  },
});
</script>
<style lang="scss" scoped>
</style>