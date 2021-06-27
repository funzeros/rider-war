import { useStore } from "@renderer/store";
import { UserStatus } from "@renderer/store/modules/user/state";

const useGame = () => {
  const store = useStore();
  return {
    gameMatting(status: UserStatus) {
      if (store.state.user.userStatus === status) return;
      const rwws = store.state.user.rwws;
      rwws.send<{ status: UserStatus; cards: string[] }>({
        type: "mate",
        data: {
          status: status,
          cards: store.state.user.userCards,
        },
      });
    },
    gameStart(gameRuntime: GObj) {
      const rwws = store.state.user.rwws;
      store.state.user.rwws.gameRuntime = gameRuntime;
      rwws.send<{ roomId: number }>({
        type: "gameStart",
        data: {
          roomId: store.state.user.room.roomId,
        },
      });
    },
    gameClear() {
      store.state.user.rwws.gameRuntime = null;
    },
  };
};

export const gameGlobal = {
  cardMoveX: 0,
  cardMoveY: 0,
  isCardDrag: false,
};

export const gMyMsg = (innerStr: string) => {
  const el = document.querySelector(".my-battle-info");
  const els = document.querySelectorAll(".my-battle-msg-box");
  els.forEach((m) => {
    el.removeChild(m);
  });
  const msgBox = document.createElement("div");
  msgBox.classList.add("my-battle-msg-box");
  msgBox.innerHTML = innerStr;
  el.appendChild(msgBox);
  msgBox.style.top = `${-(10 + msgBox.offsetHeight)}px`;
};

export default useGame;
