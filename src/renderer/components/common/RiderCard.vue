<template>
  <div class="rider-card">
    <div class="content">
      <el-image src=""></el-image>
      <div class="text">假面骑士圣刃</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GRiderCard",
  props: {
    value: {
      type: Object,
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
.rider-card {
  width: $--width;
  height: $--height;
  background-image: linear-gradient(-45deg, #09203f 0%, #537895 100%);
  position: relative;
  cursor: pointer;
  user-select: none;
  font-size: 12px;
  transition: all 100ms 50ms linear;
  &:hover {
    transform: scale(1.2);
    z-index: 9;
  }
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
