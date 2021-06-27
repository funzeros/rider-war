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
import { getIndexFromDOMS, RiderBattleSys } from "./util";
import anime from "animejs";
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
      round: 0,
      actTime: 0,
      maxActTime: 10,
      currentHandCard: "",
      instanceId: "",
      attackStartX: 0,
      attackStartY: 0,
      windowWidth: 0,
      windowHeight: 0,
      isAttackDrag: false,
    });
    const methods = {
      chooseHandCard(cardId: string) {
        modelData.currentHandCard = cardId;
      },
      handleOnAttackStart({ startX, startY, instanceId }) {
        modelData.isAttackDrag = true;
        modelData.attackStartX = startX;
        modelData.attackStartY = startY;
        modelData.instanceId = instanceId;
      },
      outCard(x: number) {
        if (modelData.battleInfo.blue.riderCards.length >= 9) {
          gMyMsg("场上最多只能存在9个骑士");
          return;
        }
        const currentHandCard = modelData.currentHandCard;
        const ins = document.querySelectorAll(".my .rider-instance");
        const index = getIndexFromDOMS(x, ins);
        const blue = cloneDeep(modelData.battleInfo.blue);
        const red = modelData.battleInfo.red;
        const card = riderObj[currentHandCard];
        if (blue.currentAct >= card.cost) {
          blue.currentAct -= card.cost;
          blue.handCards = blue.handCards.filter((m) => m !== currentHandCard);
          blue.libCards.push(currentHandCard);
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
      handleNextTurn() {
        if (!modelData.actionFlag) return;
        store.state.user.rwws.send({
          type: "nextTurn",
          data: { roomId: modelData.roomId },
        });
      },
      attackCard(tId: string, sId: string) {
        const params: AttachVO = {
          actionList: [],
          room: {},
        };
        params.actionList.push({
          s: sId,
          t: tId,
          a: "attack",
        });
        const blue = cloneDeep(modelData.battleInfo.blue);
        const red = cloneDeep(modelData.battleInfo.red);
        const blueIndex = blue.riderCards.findIndex((m) => {
          return m.id === sId;
        });
        const redIndex = red.riderCards.findIndex((m) => {
          return m.id === tId;
        });
        if (blueIndex !== -1 && redIndex !== -1) {
          const { player } = RiderBattleSys.riderBattle(
            blue,
            red,
            blueIndex,
            redIndex
          );
          params.room.player = player;
        }
        store.state.user.rwws.send({
          type: "attack",
          data: params,
        });
      },
      attackOther(sId: string) {
        const params: AttachVO = {
          actionList: [],
          room: {},
        };
        const blue = cloneDeep(modelData.battleInfo.blue);
        const red = cloneDeep(modelData.battleInfo.red);
        params.actionList.push({
          s: sId,
          t: "" + red.id,
          a: "attack",
        });
        const blueIndex = blue.riderCards.findIndex((m) => {
          return m.id === sId;
        });
        if (blueIndex !== -1) {
          const { player } = RiderBattleSys.attackOther(blue, red, blueIndex);
          params.room.player = player;
        }
        store.state.user.rwws.send({
          type: "attack",
          data: params,
        });
      },
      handleRecycle(id: string) {
        const blue = cloneDeep(modelData.battleInfo.blue);
        const red = modelData.battleInfo.red;
        const blueIndex = blue.riderCards.findIndex((m) => {
          return m.id === id;
        });
        if (blueIndex !== -1) {
          blue.riderCards.splice(blueIndex, 1);
          blue.currentAct = Math.min(blue.maxAct, blue.currentAct + 1);
        }
        store.state.user.rwws.send({
          type: "syncState",
          data: {
            player: {
              [blue.id]: blue,
              [red.id]: red,
            },
          },
        });
      },
    };
    let timer = null;
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
        modelData.round = room.round;
        modelData.actTime = room.actTime;
        modelData.maxActTime = Math.max(room.actTime, 10);
        clearInterval(timer);
        timer = setInterval(() => {
          modelData.actTime = Math.max(0, --modelData.actTime);
        }, 1000);
      },
      actionAnime(actionList: GObj[]) {
        const tl = anime.timeline({
          duration: 100,
        });
        RiderBattleSys.actionAnimeCDN(actionList, tl);
      },
    };
    onMounted(() => {
      gameStart(gameRuntime);
      const myCardAreaDom = document.querySelector(
        ".my-card-area"
      ) as HTMLElement;
      const otherCardAreaDom = document.querySelector(
        ".other-card-area"
      ) as HTMLElement;
      const otherPlayDom = document.querySelector(
        ".oppose-state"
      ) as HTMLElement;
      const canvas = document.querySelector("#animationCanvas") as any;
      const canvasContext = canvas.getContext("2d");

      window.onmousemove = (e) => {
        if (gameGlobal.isCardDrag) {
          gameGlobal.cardMoveX = e.pageX;
          gameGlobal.cardMoveY = e.pageY;
        }
        if (modelData.isAttackDrag) {
          window.requestAnimationFrame(() => {
            // 绘制攻击箭头开始
            canvasContext.clearRect(
              0,
              0,
              modelData.windowWidth,
              modelData.windowHeight
            );
            canvasContext.strokeStyle = "maroon";
            canvasContext.fillStyle = "maroon";
            canvasContext.save();
            canvasContext.setLineDash([40, 10]);
            canvasContext.lineWidth = 30;
            canvasContext.beginPath();
            canvasContext.moveTo(
              modelData.attackStartX,
              modelData.attackStartY
            );
            canvasContext.lineTo(e.pageX, e.pageY);
            canvasContext.fill();
            canvasContext.stroke();
            canvasContext.restore();
            canvasContext.save();
            canvasContext.beginPath();
            canvasContext.lineCap = "square";
            canvasContext.translate(e.pageX, e.pageY);
            let getLineRadians = () => {
              // 计算直线当前的角度
              let _a = e.pageX - modelData.attackStartX;
              let _b = e.pageY - modelData.attackStartY;
              let _c = Math.hypot(_a, _b);
              return Math.acos(_a / _c) * Math.sign(_b);
            };
            canvasContext.rotate(getLineRadians() - Math.PI / 2);
            canvasContext.moveTo(35, -40);
            canvasContext.lineTo(0, 25);
            canvasContext.lineTo(-35, -40);
            canvasContext.lineTo(35, -40);
            canvasContext.fill();
            canvasContext.stroke();
            canvasContext.restore();
            // 绘制攻击箭头结束
          });
        }
      };
      window.onmouseup = (e) => {
        if (e.which === 1) {
          if (gameGlobal.isCardDrag) {
            gameGlobal.isCardDrag = false;
            myCardAreaDom.style.display = "none";
            if (!modelData.actionFlag) {
              gMyMsg("当前不是你的回合");
              modelData.currentHandCard = "";
              return;
            }
            if (modelData.currentHandCard) {
              const top = myCardAreaDom.parentElement.offsetTop,
                width = myCardAreaDom.parentElement.offsetWidth,
                left = myCardAreaDom.parentElement.offsetLeft,
                height = myCardAreaDom.parentElement.offsetHeight;
              const x = gameGlobal.cardMoveX,
                y = gameGlobal.cardMoveY;
              if (x > left && x < left + width && y > top && y < top + height) {
                methods.outCard(x);
                modelData.currentHandCard = "";
              }
            }
          }
          if (modelData.isAttackDrag) {
            modelData.isAttackDrag = false;
            canvasContext.clearRect(
              0,
              0,
              modelData.windowWidth,
              modelData.windowHeight
            );
            if (!modelData.actionFlag) {
              gMyMsg("当前不是你的回合");
              modelData.instanceId = "";
              return;
            }
            const x = e.pageX, // 鼠标松开的x
              y = e.pageY; // 鼠标松开的y
            let k = ""; // 用于记录找到的卡牌的namei
            otherCardAreaDom.childNodes.forEach((cd: HTMLElement, i) => {
              // 循环遍历对手的卡牌dom
              const op = cd.offsetParent as HTMLElement;
              const top = cd.offsetTop + op.offsetTop,
                width = cd.offsetWidth,
                left = cd.offsetLeft,
                height = cd.offsetHeight;
              if (x > left && x < left + width && y > top && y < top + height) {
                // 边缘检测
                k = cd.dataset.name;
              }
            });
            if (k) {
              methods.attackCard(k, modelData.instanceId);
            } else {
              const top = otherPlayDom.offsetTop,
                width = otherPlayDom.offsetWidth,
                left = otherPlayDom.offsetLeft,
                height = otherPlayDom.offsetHeight;
              if (x > left && x < left + width && y > top && y < top + height) {
                // 边缘检测
                methods.attackOther(modelData.instanceId);
              }
            }
            modelData.instanceId = "";
          }
        }
      };
      modelData.windowWidth = window.innerWidth;
      modelData.windowHeight = window.innerHeight;
      window.onresize = () => {
        modelData.windowWidth = window.innerWidth;
        modelData.windowHeight = window.innerHeight;
      };
    });
    onUnmounted(() => {
      gameClear();
      window.onmousemove = undefined;
      window.onmouseup = undefined;
      clearInterval(timer);
    });
    const percentage = computed(() => {
      return Math.floor((modelData.actTime * 100) / modelData.maxActTime);
    });
    const constData = {
      customColors: [
        { color: "#f56c6c", percentage: 40 },
        { color: "#e6a23c", percentage: 60 },
        { color: "#5cb87a", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 },
      ],
    };
    return {
      percentage,
      ...toRefs(modelData),
      ...methods,
      ...constData,
    };
  },
});
