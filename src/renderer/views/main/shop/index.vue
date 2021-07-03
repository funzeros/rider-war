<template>
  <div class="shop-wrap">
    <HeaderDiv isBack />
    <div class="inner">
      <div class="group gj">
        <div class="title">高级抽卡</div>
        <div
          class="btn"
          :class="{
            disabled: disabled(1, true),
          }"
          @click="handleDraw(1)"
        >
          1000/1次
        </div>
        <div
          class="btn"
          :class="{
            disabled: disabled(11, true),
          }"
          @click="handleDraw(2)"
        >
          10000/11次
        </div>
      </div>
      <div class="group pt">
        <div class="title">普通抽卡</div>
        <div
          class="btn"
          :class="{
            disabled: disabled(1, false),
          }"
          @click="handleDraw(3)"
        >
          100/1次
        </div>
        <div
          class="btn"
          :class="{ disabled: disabled(11, false) }"
          @click="handleDraw(4)"
        >
          1000/11次
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import HeaderDiv from "@renderer/views/Components/Header.vue";
import { riderList } from "@renderer/const/riders";
import { useStore } from "@renderer/store";
import { GMath } from "@renderer/utils/custom";

export default defineComponent({
  components: { HeaderDiv },
  setup() {
    const store = useStore();
    const hasCardList = computed(() => {
      return store.state.user.cardList;
    });
    const methods = {
      handleGetCard(count: 1, noRepeat = false) {
        let riderIdList = riderList.map(({ id }) => id);
        if (noRepeat)
          riderIdList = riderIdList.filter(
            (m) => !hasCardList.value.includes(m)
          );
        if (riderIdList.length < count) return [];
        return new Array(count).fill(true).map(() => {
          const index = GMath.randomArrayLength(riderIdList.length);
          const id = riderIdList.splice(index, 1)[0];
          return {
            id: id,
            repeat: hasCardList.value.includes(id),
          };
        });
      },
      handleDraw(type: number) {
        let list: { id: string; repeat: boolean }[] = [];
        switch (type) {
          case 1:
            list = this.handleGetCard(1, true);
            break;
          case 2:
            list = this.handleGetCard(11, true);
            break;
          case 3:
            list = this.handleGetCard(1, false);
            break;
          case 4:
            list = this.handleGetCard(11, false);
            break;
          default:
        }
        console.log(list);
      },
      disabled(count: 1, noRepeat = false) {
        if (noRepeat) {
          return (
            riderList.filter((m) => !hasCardList.value.includes(m.id)).length <
            count
          );
        } else {
          return riderList.length < count;
        }
      },
    };
    return {
      ...methods,
    };
  },
});
</script>
<style lang="scss" scoped>
.shop-wrap {
  padding: 80px 50px 50px;
  height: 100%;
  background-color: #e0e0e0;
}
.inner {
  width: 100%;
  height: 100%;
  border-radius: 50px;
  background: #e0e0e0;
  box-shadow: inset 20px 20px 60px #bebebe, inset -20px -20px 60px #ffffff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .group {
    width: 30vw;
    height: 30vw;
    border-radius: 50px;
    border-radius: 50px;
    background: linear-gradient(145deg, #cacaca, #f0f0f0);
    box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
    padding: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    .title,
    .btn {
      font-size: 30px;
      text-shadow: 0 0 1px #000, 0 0 2px #000, 0 0 3px #000;
      color: #ffffff;
      font-weight: 600;
    }
    .btn {
      cursor: pointer;
      width: 220px;
      height: 50px;
      padding: 10px;
      text-align: center;
      line-height: 30px;
      border-radius: 25px;
      animation: breathShadow 2s infinite;
    }
    &.gj {
      .title {
        color: #ffc70e;
      }
      .btn {
        background-color: #ffc70e;
      }
    }
    &.pt {
      .title {
        color: #34f36d;
      }
      .btn {
        background-color: #34f36d;
      }
    }
    .btn:not(.disabled):hover {
      box-shadow: 0 0 10px #ff0, 0 0 20px rgb(255, 255, 0), 0 0 30px #ff0;
      animation: none;
    }
    .btn:not(.disabled):active {
      transform: scale(0.95);
    }
    .btn.disabled {
      pointer-events: none;
      animation: none;
      background-color: gray;
    }
  }
}
@keyframes breathShadow {
  0% {
    box-shadow: 0 0 0 #ff0;
  }
  50% {
    box-shadow: 0 0 20px #ff0;
  }
  100% {
    box-shadow: 0 0 0 #ff0;
  }
}
</style>
