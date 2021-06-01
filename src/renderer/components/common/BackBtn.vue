<template>
  <div class="back-btn" @click.stop.capture="handleClick">
    <i class="el-icon-back"></i>
  </div>
</template>
<script lang="ts">
import { useGRoute } from "@renderer/hooks/useRoute";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "GBack",
  props: {
    url: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const { pushGoBack, pushRouteFullpath } = useGRoute();
    const handleClick = () => {
      if (props.url) pushRouteFullpath(props.url);
      else if (history.length <= 1) pushRouteFullpath("/desk_top");
      else pushGoBack();
    };
    return { handleClick };
  },
});
</script>
<style lang="scss" scoped>
.back-btn {
  position: fixed;
  left: 10px;
  top: 10px;
  cursor: pointer;
  height: 50px;
  width: 50px;
  opacity: 0.5;
  border-radius: 50%;
  border-radius: 50px;
  background: #999;
  box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
  text-align: center;
  i {
    color: #eee;
    font-size: 50px;
    line-height: 50px;
  }
  &:hover {
    opacity: 1;
  }
  &:active {
    opacity: 0.8;
  }
}
</style>