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
  canDrag: false,
};
export default useGame;
