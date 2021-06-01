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
$--width: 200px;
$--height: 260px;
$--width-cont: 190px;
$--height-cont: 250px;
$--offset: 5px;
.rider-card {
  width: $--width;
  height: $--height;
  background-image: linear-gradient(-45deg, #09203f 0%, #537895 100%);
  position: relative;
  cursor: pointer;
  user-select: none;
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
      height: 160px;
    }
    .text {
      flex: 1;
      padding: 10px;
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
