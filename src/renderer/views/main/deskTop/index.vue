<template>
  <div class="main-wrap">
    <!-- 背景 -->
    <video class="video" muted="" autoplay="" preload="" loop="">
      <source :src="video.mp4_saber_01" />
    </video>
    <HeaderDiv />
    <!-- 按钮组 -->
    <div class="btn-grid-wrap">
      <div class="btn-grid">
        <g-text-btn
          v-for="(item, index) of btnListCp"
          :key="'btn_' + index"
          :class="[`grid-span-${item.span}`]"
          :style="{ width: item.width }"
          @click="item.func"
          >{{ item.name }}</g-text-btn
        >
      </div>
    </div>
    <ChatView style="bottom: 10vh; right: 10vh" />
    <Setting ref="SettingRef" />
    <DialogExit ref="DialogExitRef" />
    <DialogUpdate />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { toComputeds } from "@renderer/utils/common";
import { useStore } from "@renderer/store";
import { UserActionsType } from "@renderer/store/modules/user/actions";
import { useGRoute } from "@renderer/hooks/useRoute";
import { video } from "@renderer/assets/resource";
import useGame from "@renderer/hooks/useGame";
import HeaderDiv from "@renderer/views/Components/Header.vue";
import DialogExit from "@renderer/views/Components/DialogExit.vue";
import Setting from "@renderer/views/Components/Setting.vue";
import DialogUpdate from "@renderer/views/Components/DialogUpdate.vue";
import ChatView from "@renderer/views/Components/ChatView.vue";
export default defineComponent({
  components: {
    HeaderDiv,
    DialogExit,
    Setting,
    DialogUpdate,
    ChatView,
  },
  setup() {
    const store = useStore();
    const { pushRouteName } = useGRoute();
    const { gameMatting } = useGame();
    const DialogExitRef = ref();
    const SettingRef = ref();

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
          name: "重新连接",
          span: "2",
          func: () => {
            store.dispatch(UserActionsType.INIT_WS);
          },
          hidden: () => {
            return !(store.getters.token && !store.getters.rwws);
          },
        },
        {
          name: "我的卡组",
          span: "2",
          hidden: true,
          func: () => {
            pushRouteName("卡组");
          },
        },
        {
          name: "商店",
          span: "2",
          width: "50%",
          func: () => {
            pushRouteName("商店");
          },
        },
        {
          name: "图鉴",
          span: "2",
          width: "50%",
          func: () => {
            pushRouteName("图鉴");
          },
        },
        {
          name: "设置",
          span: "2",
          width: "50%",
          func: () => {
            SettingRef.value.open();
          },
        },
        {
          name: "退出",
          span: "2",
          width: "50%",
          func: () => {
            DialogExitRef.value.open();
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

    return {
      ...computeds,
      ...constData,
      video,
      DialogExitRef,
      SettingRef,
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
  background-color: #333;
  &::before {
    content: "";
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 10vw;
    height: 10vh;
    background-color: rgb(237, 219, 168);
    border-radius: 5vh;
    filter: blur(10px);
  }
  .btn-grid-wrap {
    position: absolute;
    left: 100px;
    top: 150px;
    perspective: 500;
    -webkit-perspective: 500;
    .btn-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      transform: rotateY(5deg) rotateX(-15deg) rotateZ(-1deg);
      opacity: 1;
    }
  }
}
.video {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  pointer-events: none;
}
.conten {
  text-align: center;
}
</style>
