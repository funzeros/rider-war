<template>
  <div class="rider-card-wrap" :riderName="value.rider">
    <div class="rider-card">
      <div class="content">
        <el-image :src="value.url" fit="cover"></el-image>
        <div
          class="text"
          :style="{ fontSize: value.name.length > 6 ? '10px' : '14px' }"
        >
          {{ value.name }}
        </div>
      </div>
    </div>
    <template v-if="showAttr">
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
    </template>
  </div>
</template>

<script lang="ts">
import { Rider } from "@renderer/types/rider/dto";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "GRiderCard",
  props: {
    value: {
      type: Object as PropType<Rider>,
      required: true,
    },
    showAttr: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { cost, hp, atk, def, dex, skl } = props.value;
    const attrList = [
      {
        prop: "cost",
        value: cost,
        position: { top: "10%", left: "0" },
        shadow: {
          clipPath: "circle(50% at 50% 50%)",
          background: "#ff6",
        },
      },
      {
        prop: "hp",
        value: hp,
        position: { top: "50%", left: "0" },
        shadow: {
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          background: "#6f6",
        },
      },
      {
        prop: "atk",
        value: atk,
        position: { top: "90%", left: "0" },
        shadow: {
          clipPath:
            "polygon(10% 0, 90% 0, 100% 20%, 60% 100%, 40% 100%, 0 20%)",
          background: "#f66",
        },
      },
      {
        prop: "def",
        value: def,
        position: { top: "30%", right: "0" },
        shadow: {
          clipPath:
            "polygon(5% 0, 50% 10%, 95% 0, 100% 50%, 60% 100%, 40% 100%, 0 50%)",
          background: "#6ff",
        },
      },
      {
        prop: "dex",
        value: dex,
        position: { top: "70%", right: "0" },
        shadow: {
          clipPath: "polygon(0 0, 50% 20%, 100% 0, 100% 80%, 50% 100%, 0 80%)",
          background: "#66f",
        },
      },
    ];
    return { attrList };
  },
});
</script>
<style lang="scss" scoped>
$--width: 100px;
$--height: $--width * 1.3;
$--offset: 2.5px;
$--padding: $--offset * 2;
$--width-cont: $--width - $--padding;
$--height-cont: $--height - $--padding;
$--img-width: $--width-cont;
.rider-card-wrap {
  user-select: none;
  position: relative;
  &::after {
    cursor: pointer;
    content: attr(riderName);
    display: block;
    position: absolute;
    top: 0px;
    font-size: 20px;
    z-index: 2;
    line-height: 0;
    left: 50%;
    transform: translateX(-50%);
    font-weight: 900;
    color: rgb(255, 255, 255);
    text-shadow: 0 0 3px #09203f;
  }
}
.rider-card {
  width: $--width;
  height: $--height;
  background-image: linear-gradient(-45deg, #09203f 0%, #537895 100%);
  position: relative;
  cursor: pointer;
  font-size: 12px;
  &::before {
    display: block;
    content: "";
    background-image: linear-gradient(
      -45deg,
      #d5d4d0 0%,
      #d5d4d0 1%,
      #eeeeec 31%,
      #efeeec 75%,
      #e9e9e7 100%
    );
  }
  &::before,
  .content {
    width: $--width-cont;
    height: $--height-cont;
    position: absolute;
    top: $--offset;
    left: $--offset;
    overflow: hidden;
  }
  .content {
    display: flex;
    flex-direction: column;
    .el-image {
      width: 100%;
      height: $--img-width;
      pointer-events: none;
    }
    .text {
      font-size: 10px;
      text-align: center;
      flex: 1;
      line-height: 27px;
      padding: 0 $--padding;
      background-image: linear-gradient(to right, #434343 0%, black 100%);
      font-weight: 900;
      color: rgb(255, 255, 255);
      text-shadow: 0 0 3px #09203f;
      border-top: 3px solid;
      border-image: linear-gradient(#333, #999, #333) 30 30;
    }
  }
}
.rider-card,
.rider-card::before,
.content {
  clip-path: polygon(
    10% 0%,
    90% 0%,
    100% 10%,
    100% 90%,
    90% 100%,
    10% 100%,
    0% 90%,
    0% 10%
  );
}

.attr {
  position: absolute;
  .shadow {
    transform: translate(-50%, -50%) !important;
    width: 20px;
    height: 20px;
    box-shadow: 0 0 6px 4px rgba($color: #fff, $alpha: 0.5) inset;
    filter: blur(3px);
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
