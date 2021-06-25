<template>
  <div class="rider-instance" :class="{ canDrag }">
    <div class="rider-inner">
      <el-image :src="value.url" fit="cover"></el-image>
      <div class="btn-group" v-if="canDrag">
        <el-popover
          placement="top"
          :width="100"
          trigger="hover"
          :disabled="!value.effects.length"
        >
          <template #reference>
            <div class="btn" :class="{ noSkill: !value.effects.length }">
              <i :class="btnList[0].icon"></i>
            </div>
          </template>
          <div class="skills">
            <div class="skill" v-for="item of value.effects" :key="item">
              {{ item }}
            </div>
          </div>
        </el-popover>

        <div class="btn canClick">
          <i :class="btnList[1].icon"></i>
        </div>
      </div>
      <div class="info" v-else>
        <el-popover
          placement="top"
          :width="100"
          trigger="hover"
          :disabled="!value.effects.length"
        >
          <template #reference>
            <div class="btn" :class="{ noSkill: !value.effects.length }">
              <i :class="btnList[0].icon"></i>
            </div>
          </template>
          <div class="skills">
            <div class="skill" v-for="item of value.effects" :key="item">
              {{ item }}
            </div>
          </div>
        </el-popover>
      </div>
    </div>
    <div class="shadow"></div>
    <CircularText>{{ value.name }}</CircularText>
    <div
      class="attr"
      v-for="item of attrList"
      :key="item.prop"
      :style="item.position"
    >
      <div class="shadow" :style="item.shadow"></div>
      <span>
        {{ item.value }}
      </span>
    </div>
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
  setup(props) {
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
    const { cHp, atk, def, dex } = props.value;
    const attrList = [
      {
        prop: "hp",
        value: cHp,
        position: { top: "65%", left: "10%" },
        shadow: {
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          background: "#6f6",
        },
      },
      {
        prop: "atk",
        value: atk,
        position: { top: "65%", left: "30%" },
        shadow: {
          clipPath:
            "polygon(10% 0, 90% 0, 100% 20%, 60% 100%, 40% 100%, 0 20%)",
          background: "#f66",
        },
      },
      {
        prop: "def",
        value: def,
        position: { top: "65%", left: "50%" },
        shadow: {
          clipPath:
            "polygon(5% 0, 50% 10%, 95% 0, 100% 50%, 60% 100%, 40% 100%, 0 50%)",
          background: "#6ff",
        },
      },
      {
        prop: "dex",
        value: dex,
        position: { top: "65%", left: "70%" },
        shadow: {
          clipPath: "polygon(0 0, 50% 20%, 100% 0, 100% 80%, 50% 100%, 0 80%)",
          background: "#66f",
        },
      },
    ];
    return {
      btnList,
      ...methods,
      attrList,
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

  .btn-group {
    flex: 1;
    border-top: 2px solid;
    border-image: linear-gradient(#333, #999, #333) 30 30;
    background-image: linear-gradient(to right, #434343 0%, black 100%);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  .btn {
    color: #fff;
    text-align: center;
    font-size: 16px;
    line-height: 30px;
    cursor: pointer;
    font-weight: 600;
    background-image: linear-gradient(60deg, #29323c 0%, #485563 100%);
    &:not(.noSkill):hover {
      box-shadow: 0 0 15px 0 rgba($color: #fff, $alpha: 0.3) inset;
    }
    &.canClick:active {
      box-shadow: 0 0 15px 0 rgba($color: #000, $alpha: 0.3) inset;
    }
    &.noSkill {
      cursor: default;
      background: transparent;
    }
  }
  .info {
    flex: 1;
    border-top: 2px solid;
    border-image: linear-gradient(#333, #999, #333) 30 30;
    background-image: linear-gradient(to right, #434343 0%, black 100%);

    .btn {
      line-height: 38px;
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
.attr {
  position: absolute;
  .shadow {
    transform: translate(-50%, -50%) !important;
    width: 20px;
    height: 20px;
    box-shadow: 0 0 6px 4px rgba($color: #fff, $alpha: 0.5) inset;
    filter: blur(1px);
  }
  span,
  .shadow {
    position: absolute;
    top: 0;
    left: 0;
    line-height: 0;
    transform: translateX(-50%);
  }
  span {
    font-weight: 600;
    color: #fff;
    text-shadow: 0 0 5px #333;
  }
}
</style>