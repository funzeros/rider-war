<template>
  <div class="chat-view" :class="{ visible }">
    <div class="msg-inner">
      <el-scrollbar ref="scrollRef">
        <div
          class="msg-item"
          :class="[item.type]"
          v-for="(item, i) of msgList"
          :key="i"
        >
          <span class="time">[{{ item.time }}]</span
          ><span class="name">{{ item.name }}：</span>
          <span class="content" v-html="transf(item.content)"> </span>
        </div>
      </el-scrollbar>
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
            <div
              class="face-item"
              v-for="item of faceList"
              :key="item.icon_id"
              :title="item.name"
            >
              <face-icon
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
        @focus="handleFocus"
        spellcheck="false"
        @keydown.enter="handleSubmit()"
      ></el-input>
    </div>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  ref,
  toRefs,
  watch,
  nextTick,
  onMounted,
} from "vue";
import { faceDataJSON } from "@renderer/styles/index";
import { useStore } from "@renderer/store";
import { CommonActionsType } from "@renderer/store/modules/common/actions";
import { MsgDTO } from "@renderer/types/common/dto";
import { CommonMutationsType } from "@renderer/store/modules/common/mutations";
export default defineComponent({
  name: "ChatView",
  setup() {
    const store = useStore();
    const inputRef = ref();
    const scrollRef = ref();
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
      handleFocus() {
        modelData.visible = false;
      },
      handleSubmit() {
        if (!modelData.msgContent) return;
        if (modelData.flag) {
          modelData.flag = false;
          store.dispatch(
            CommonActionsType.SEND_MSG,
            new MsgDTO(modelData.msgContent, store.state.user.userInfo.name)
          );
          modelData.msgContent = "";
          setTimeout(() => {
            modelData.flag = true;
          }, 200);
        } else {
          store.commit(
            CommonMutationsType.PUSH_MSG,
            new MsgDTO("发送消息过于频繁", "系统", "sys")
          );
        }
      },
      transf(str: string) {
        // 去标签，转化faceicon后再渲染成html
        return str
          .replace(/<(\w+)[^>]*>(.*?<\/\1>)?/g, "")
          .replace(/\[[\w\-]*\]/g, (m) => {
            return `<svg class="icon" aria-hidden="true" style="font-size: 30px;">
                    <use xlink:href="#face-${m.slice(1, m.length - 1)}"></use>
                  </svg>`;
          });
      },
      scrollToBottom() {
        nextTick(() => {
          scrollRef.value.wrap.scrollTop = scrollRef.value.wrap.scrollHeight;
        });
      },
    };
    const msgList = computed(() => {
      return store.state.common.msgList;
    });
    watch(() => msgList.value, methods.scrollToBottom);
    onMounted(() => {
      methods.scrollToBottom();
    });
    return {
      faceList: faceDataJSON.glyphs,
      ...toRefs(modelData),
      ...methods,
      inputRef,
      scrollRef,
      msgList,
    };
  },
});
</script>
<style lang="scss" scoped>
.chat-view {
  position: fixed;
  width: 400px;
  height: 400px;
  background-color: rgba($color: #000000, $alpha: 0.6);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  will-change: background-color, box-shadow;
  transition: all 100ms ease-in-out;
  .msg-inner {
    flex: 1;
    box-sizing: border-box;
    padding: 5px 10px;
    overflow: hidden;
  }
  .send-inner {
    height: 0px;
    box-shadow: 0 0px 4px 0px #fff;
    display: flex;
    will-change: height;
    transition: height 100ms ease-in-out;
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
  &:hover,
  &.visible {
    background-color: rgba($color: #000000, $alpha: 0.8);
    box-shadow: 0 0 4px 0px #fff inset;
    .send-inner {
      height: 40px;
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
.msg-item {
  color: #bbb;
  height: 30px;
  line-height: 30px;
  .time {
    color: #999;
  }
  .name {
    color: #ddd;
  }
  .content {
    word-break: break-all;
  }
  &.sys {
    &,
    .name,
    .time {
      color: rgb(200, 180, 70);
    }
  }
}
</style>