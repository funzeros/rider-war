<template>
  <div class="rider-instance" :class="{ canDrag }">
    <div class="rider-inner">
      <el-image :src="value.url" fit="cover"></el-image>
      <div class="btn-group" v-if="canDrag">
        <div class="btn">
          <i :class="btnList[0].icon"></i>
        </div>
        <el-popconfirm
          title="要回收这名骑士并返还1点行动吗？"
          confirmButtonText="好的"
          cancelButtonText="点错了"
          @confirm="handleConfirm"
        >
          <template #reference>
            <div class="btn">
              <i :class="btnList[1].icon"></i>
            </div>
          </template>
        </el-popconfirm>
      </div>
      <div class="info" v-else></div>
    </div>
    <div class="shadow"></div>
    <CircularText>{{ value.name }}</CircularText>
  </div>
</template>
<script lang="ts">
import { PropType } from "vue";
export default {
  props: {
    value: {
      type: Object as PropType<RiderInstance>,
      required: true,
    },
    canDrag: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const btnList = [
      {
        name: "技能",
        icon: "el-icon-s-help",
      },
      {
        name: "回收",
        icon: "el-icon-delete-solid",
        placement: "bottom-end",
      },
    ];
    const methods = {
      handleConfirm() {},
    };
    return {
      btnList,
      ...methods,
    };
  },
};
</script>

<style lang="scss" scoped>
.rider-instance {
  width: 110px;
  height: 150px;
  background: #aaa;
  box-shadow: 0 0 4px 0 #fff, 0 0 1px 1px #223;
  position: relative;
  &:not(:first-of-type) {
    margin-left: 30px;
  }
  &.canDrag {
    cursor: pointer;
    &:hover {
      transform: scale(1.2);
      z-index: 9;
    }
  }
}
.rider-instance,
.rider-inner {
  border-radius: 50% / 50% 50% 25% 25%;
}
.rider-inner {
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .el-image {
    pointer-events: none;
  }
  .info {
    flex: 1;
    border-top: 2px solid;
    border-image: linear-gradient(#333, #999, #333) 30 30;
    background-image: linear-gradient(to right, #434343 0%, black 100%);
  }
  .btn-group {
    flex: 1;
    border-top: 2px solid;
    border-image: linear-gradient(#333, #999, #333) 30 30;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    .btn {
      color: #fff;
      text-align: center;
      font-size: 16px;
      line-height: 30px;
      cursor: pointer;
      font-weight: 600;
      background-image: linear-gradient(60deg, #29323c 0%, #485563 100%);
      &:hover {
        box-shadow: 0 0 15px 0 rgba($color: #fff, $alpha: 0.3) inset;
      }
      &:active {
        box-shadow: 0 0 15px 0 rgba($color: #000, $alpha: 0.3) inset;
      }
    }
  }
}
.shadow {
  border-radius: 50% 50% 0 0 / 64% 64% 0 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 110px;
  pointer-events: none;
  box-shadow: 0 0 20px 4px #fff inset;
}
.circular-text {
  width: 100vw;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  font-weight: 600;
  text-shadow: 0 0 3px #09203f;
}
</style>