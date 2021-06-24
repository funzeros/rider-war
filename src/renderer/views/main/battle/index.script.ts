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
import useGame, { gameGlobal, gMyMsg } from "@renderer/hooks/useGame";
import { useStore } from "@renderer/store";
import { BattleDTO, PlayerDTO } from "@renderer/types/game/dto";
import { mergeProperties } from "@renderer/utils/common";
import { cloneDeep } from "lodash";
import { riderObj } from "@renderer/const/riders";
import { getIndexFromDOMS } from "./util";
export default defineComponent({
  components: {
    OurOpt,
    CardsArea,
    OpposeState,
  },
  setup() {
    const store = useStore();
    const { gameStart, gameClear } = useGame();
    const userInfo = computed(() => {
      return store.state.user.userInfo;
    });
    const modelData = reactive({
      roomId: 0,
      battleInfo: new BattleDTO(),
      actionFlag: false,
      currentHandCard: "",
    });
    const methods = {
      chooseHandCard(cardId: string) {
        modelData.currentHandCard = cardId;
      },
      outCard(x: number) {
        const ins = document.querySelectorAll(".my .rider-instance");
        const index = getIndexFromDOMS(x, ins);
        const blue = cloneDeep(modelData.battleInfo.blue);
        const red = modelData.battleInfo.red;
        const card = riderObj[modelData.currentHandCard];
        if (blue.currentAct >= card.cost) {
          blue.currentAct -= card.cost;
          blue.handCards = blue.handCards.filter(
            (m) => m !== modelData.currentHandCard
          );
          blue.riderCards.splice(index, 0, card.createInstance());
          store.state.user.rwws.send({
            type: "syncState",
            data: {
              player: {
                [blue.id]: blue,
                [red.id]: red,
              },
            },
          });
        } else {
          gMyMsg("行动力不够了");
        }
      },
    };

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
        gameGlobal.canDrag = modelData.actionFlag;
      },
    };
    onMounted(() => {
      gameStart(gameRuntime);
      const myCardAreaDom = document.querySelector(
        ".my-card-area"
      ) as HTMLElement;
      window.onmousemove = (e) => {
        if (gameGlobal.isCardDrag) {
          gameGlobal.cardMoveX = e.pageX;
          gameGlobal.cardMoveY = e.pageY;
        }
      };
      window.onmouseup = (e) => {
        if (e.which === 1) {
          if (gameGlobal.isCardDrag) {
            gameGlobal.isCardDrag = false;
            if (modelData.currentHandCard) {
              const top = myCardAreaDom.parentElement.offsetTop,
                width = myCardAreaDom.parentElement.offsetWidth,
                left = myCardAreaDom.parentElement.offsetLeft,
                height = myCardAreaDom.parentElement.offsetHeight;
              const x = gameGlobal.cardMoveX,
                y = gameGlobal.cardMoveY;
              if (x > left && x < left + width && y > top && y < top + height) {
                methods.outCard(x);
              }
              myCardAreaDom.style.display = "none";
              modelData.currentHandCard = "";
            }
          }
        }
      };
    });
    onUnmounted(() => {
      gameClear();
      window.onmousemove = undefined;
      window.onmouseup = undefined;
    });
    return {
      ...toRefs(modelData),
      ...methods,
    };
  },
});
