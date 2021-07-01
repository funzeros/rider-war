<template>
  <div class="chat-view">
    <div class="msg-inner">
      <el-scrollbar> </el-scrollbar>
    </div>
    <div class="send-inner">
      <div class="face">
        <el-popover
          placement="top"
          title="表情"
          :width="420"
          trigger="manual"
          v-model:visible="visible"
        >
          <template #reference>
            <face-icon
              value="face-1011"
              size="30"
              @click="visible = !visible"
            ></face-icon>
          </template>
          <div class="face-grid">
            <div class="face-item" v-for="item of faceList" :key="item.icon_id">
              <face-icon
                :title="item.name"
                :value="'face-' + item.font_class"
                size="30"
                @click="handleInsertFace(item.font_class)"
              ></face-icon>
            </div>
          </div>
        </el-popover>
      </div>
      <el-input
        ref="inputRef"
        v-model.trim="msgContent"
        maxlength="255"
        @blur="handleBlur"
        spellcheck="false"
        @keydown.enter="handleSubmit()"
      ></el-input>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { faceDataJSON } from "@renderer/styles/index";
import { useStore } from "@renderer/store";
import { CommonActionsType } from "@renderer/store/modules/common/actions";
import { MsgDTO } from "@renderer/types/common/dto";
export default defineComponent({
  name: "ChatView",
  setup() {
    const store = useStore();
    const inputRef = ref();
    const modelData = reactive({
      msgContent: "",
      visible: false,
      offset: 0,
      flag: true,
    });
    const methods = {
      handleInsertFace(fontClass: string) {
        if (fontClass) {
          modelData.msgContent = `${modelData.msgContent.slice(
            0,
            modelData.offset
          )}[${fontClass}]${modelData.msgContent.slice(modelData.offset)}`;
        }
      },
      handleBlur() {
        modelData.offset = inputRef.value.$el.children[0].selectionStart;
      },
      handleSubmit() {
        if (!modelData.msgContent) return;
        if (modelData.flag) {
          modelData.flag = false;
          store.dispatch(
            CommonActionsType.SEND_MSG,
            new MsgDTO(modelData.msgContent, store.state.user.userInfo.name)
          );
          setTimeout(() => {
            modelData.flag = true;
          }, 200);
        } else {
          console.log("发送消息过于频繁");
        }
      },
    };
    return {
      faceList: faceDataJSON.glyphs,
      ...toRefs(modelData),
      ...methods,
      inputRef,
    };
  },
});
</script>
<style lang="scss" scoped>
.chat-view {
  position: fixed;
  width: 400px;
  height: 400px;
  background-color: rgba($color: #000000, $alpha: 0.8);
  box-shadow: 0 0 4px 0px #fff inset;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .msg-inner {
    flex: 1;
  }
  .send-inner {
    height: 40px;
    box-shadow: 0 0px 4px 0px #fff;
    display: flex;
    .face {
      height: 40px;
      width: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      & > svg {
        cursor: pointer;
      }
    }
  }
}
.el-input {
  flex: 1;
  :deep(input) {
    background: transparent;
    border: none;
    outline: none;
    color: #eee;
  }
}
.face-grid {
  display: grid;
  grid-template-columns: repeat(10, 40px);
  justify-items: center;
  align-items: center;
  .face-item {
    & > svg {
      cursor: pointer;
    }
  }
}
</style>