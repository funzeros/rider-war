<template>
  <div class="rider-card-wrap" :riderName="value.rider">
    <div class="rider-card">
      <div class="content">
        <el-image :src="value.url" fit="contain"></el-image>
        <div class="text">{{ value.name }}</div>
      </div>
    </div>
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
  },
  setup() {
    return {};
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
$--img-width: $--width-cont - 15px;
.rider-card-wrap {
  user-select: none;
  position: relative;
  transition: all 100ms 50ms linear;
  &:hover {
    transform: scale(1.2);
    z-index: 9;
  }
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
    }
    .text {
      flex: 1;
      padding: $--padding;
      background-color: #cddcdc;
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
</style>
