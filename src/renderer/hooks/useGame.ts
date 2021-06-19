import { useStore } from "@renderer/store";
import { UserStatus } from "@renderer/store/modules/user/state";

const useGame = () => {
  const store = useStore();
  return {
    gameMatting(status: UserStatus) {
      if (store.state.user.userStatus === status) return;
      const rwws = store.state.user.rwws;
      rwws.send<{ status: UserStatus }>({
        type: "mate",
        data: {
          status: status,
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

export default useGame;
