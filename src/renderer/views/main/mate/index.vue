<template>
  <div class="mate-wrap">
    <div v-show="mateTimer" class="box">
      <div>
        <i class="el-icon-loading"></i> <span>匹配中</span> &nbsp;<span>{{
          mateTime
        }}</span>
      </div>
      <i class="el-icon-close close" @click="handleCancel"></i>
    </div>
  </div>
</template>

<script lang="ts">
import useGame from "@renderer/hooks/useGame";
import { useStore } from "@renderer/store";
import { computed, defineComponent } from "vue";

export default defineComponent({
  setup() {
    const store = useStore();
    const { gameMatting } = useGame();
    const mateTime = computed(() => {
      const num = store.state.user.mateTime;
      const s = num % 60;
      const m = Math.floor(num / 60);
      return (m ? m + "分" : "") + s + "秒";
    });
    const mateTimer = computed(() => {
      return store.state.user.mateTimer;
    });
    const handleCancel = () => {
      gameMatting("online");
    };
    return { mateTime, mateTimer, handleCancel };
  },
});
</script>
<style lang="scss" scoped>
.mate-wrap {
  text-align: center;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  .box {
    height: 80px;
    color: #fff;
    padding: 8px 12px;
    background-image: linear-gradient(
      to bottom,
      rgba(#000, 0.8) 0%,
      rgba(#000, 0) 100%
    );
    .close {
      margin-top: 8px;
      cursor: pointer;
      &:hover {
        color: #ececec;
      }
    }
  }
}
</style>
