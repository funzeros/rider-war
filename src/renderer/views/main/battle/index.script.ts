import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
  toRefs,
} from "vue";
import OurOpt from "./Components/OurOpt.vue";
import CardsArea from "./Components/CardsArea.vue";
import OpposeState from "./Components/OpposeState.vue";
import useGame from "@renderer/hooks/useGame";
import { useStore } from "@renderer/store";
import { BattleDTO, PlayerDTO } from "@renderer/types/game/dto";
import { mergeProperties } from "@renderer/utils/common";

export default defineComponent({
  components: {
    OurOpt,
    CardsArea,
    OpposeState,
  },
  setup() {
    const store = useStore();
    const { gameStart, gameClear } = useGame();
    const modelData = reactive({
      roomId: 0,
      battleInfo: new BattleDTO(),
      actionFlag: false,
    });
    const methods = {};
    const userInfo = computed(() => {
      return store.state.user.userInfo;
    });
    const gameRuntime = {
      initGame({ room }: { room: Room }) {
        const id = userInfo.value.id;
        modelData.roomId = room.roomId;
        for (const key in room.player) {
          if (+key === id)
            modelData.battleInfo.blue = mergeProperties(
              new PlayerDTO(),
              room.player[key]
            );
          else
            modelData.battleInfo.red = mergeProperties(
              new PlayerDTO(),
              room.player[key]
            );
        }
        modelData.actionFlag = room.turnId === id;
      },
    };
    onMounted(() => {
      gameStart(gameRuntime);
    });
    onUnmounted(() => {
      gameClear();
    });
    return {
      ...toRefs(modelData),
      ...methods,
    };
  },
});
