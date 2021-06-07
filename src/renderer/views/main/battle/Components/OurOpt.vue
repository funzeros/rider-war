<template>
  <div class="opt-wrap">
    <div class="card-list">
      <GRiderCard :value="o" v-for="o of riderList" :key="o.id"></GRiderCard>
    </div>
    <MyInfo></MyInfo>
    <div class="action-point grid-span-2">
      <Progress :value="7" :maxValue="10"></Progress>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import Progress from "./Progress.vue";
import MyInfo from "./MyInfo.vue";
import { riderList } from "@renderer/const/riders";
export default defineComponent({
  components: {
    Progress,
    MyInfo,
  },
  setup() {
    return { riderList };
  },
});
</script>
<style lang="scss" scoped>
.opt-wrap {
  width: 100%;
  height: 100%;
  display: grid;
  gap: 5px;
  grid-template-columns: 1fr 200px;
  grid-template-rows: 1fr 15px;
  .card-list {
    display: flex;
    justify-content: center;
    align-items: center;
    & > div:not(:last-of-type) {
      margin-right: 20px;
    }
  }
}
</style>
