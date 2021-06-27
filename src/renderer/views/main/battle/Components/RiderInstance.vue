<template>
  <div class="rider-instance" :class="{ isMy, canAtk: value.sAtks }">
    <div class="rider-inner">
      <el-image :src="value.url" fit="cover"></el-image>
      <div class="btn-group" v-if="isMy" @mousedown.stop="() => void 0">
        <el-popover
          placement="top"
          :width="100"
          trigger="click"
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
        <div class="btn canClick" @click.left="btnList[1].func">
          <i :class="btnList[1].icon"></i>
        </div>
      </div>
      <div class="info" v-else @mousedown.stop="() => void 0">
        <el-popover
          placement="top"
          :width="100"
          trigger="click"
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
      :title="item.desc + item.value"
    >
      <div class="attr-shadow" :style="item.shadow"></div>
      <span>
        {{ item.value }}
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, PropType } from "vue";
import { gMyMsg } from "@renderer/hooks/useGame";
export default {
  props: {
    value: {
      type: Object as PropType<RiderInstance>,
      required: true,
    },
    isMy: {
      type: Boolean,
      default: false,
    },
    canDrag: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["recycle"],
  setup(props, ctx) {
    const btnList = [
      {
        name: "技能",
        icon: "el-icon-s-help",
      },
      {
        name: "回收",
        icon: "el-icon-delete-solid",
        placement: "bottom-end",
        func: () => {
          if (props.canDrag) {
            ctx.emit("recycle", props.value.id);
          } else {
            gMyMsg("仅在你的回合才能回收");
          }
        },
      },
    ];
    const methods = {
      handleConfirm() {},
    };
    const attrList = computed(() => {
      const { cHp, atk, def, dex, cFury } = props.value;
      return [
        {
          prop: "hp",
          value: cHp,
          desc: "生命",
          position: { top: "65%", left: "10%" },
          shadow: {
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            background: "#6f6",
          },
        },
        {
          prop: "def",
          value: def,
          desc: "护甲",
          position: { top: "65%", left: "30%" },
          shadow: {
            clipPath:
              "polygon(5% 0, 50% 10%, 95% 0, 100% 50%, 60% 100%, 40% 100%, 0 50%)",
            background: "#6ff",
          },
        },
        {
          prop: "atk",
          value: atk,
          desc: "攻击",
          position: { top: "65%", left: "50%" },
          shadow: {
            clipPath:
              "polygon(10% 0, 90% 0, 100% 20%, 60% 100%, 40% 100%, 0 20%)",
            background: "#f66",
          },
        },

        {
          prop: "dex",
          value: dex,
          desc: "速度",
          position: { top: "65%", left: "70%" },
          shadow: {
            clipPath:
              "polygon(0 0, 50% 20%, 100% 0, 100% 80%, 50% 100%, 0 80%)",
            background: "#66f",
          },
        },
        {
          prop: "cFury",
          value: cFury,
          desc: "怒气",
          position: { top: "65%", left: "90%" },
          shadow: {
            clipPath:
              "polygon(20% 20%, 10% 50%, 10% 80%, 40% 100%, 60% 100%, 90% 80%, 90% 50%, 80% 20%, 70% 60%, 50% 0%, 30% 60%)",
            background: "#fc6",
          },
        },
      ];
    });

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
  &.isMy {
    cursor: pointer;
    &.canAtk {
      box-shadow: 0 0 10px 0 #ff0;
    }
    &:hover {
      z-index: 9;
      transform: scale(1.05);
      &.canAtk {
        box-shadow: 0 0 10px 0 #ff0, 0 0 20px 0 #ff0;
      }
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
  box-shadow: 0 5px 10px 4px #fff inset, 0 -20px 30px 0px #000 inset;
}
.rider-instance.isMy:not(.canAtk) .shadow {
  box-shadow: 0 0px 10px 2px #eee inset, 0 0px 50px 0px #000 inset;
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
  .attr-shadow {
    transform: translate(-50%, -50%) !important;
    width: 20px;
    height: 20px;
    box-shadow: 0 0 6px 4px rgba($color: #fff, $alpha: 0.5) inset;
    filter: blur(5px);
  }
  span,
  .attr-shadow {
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