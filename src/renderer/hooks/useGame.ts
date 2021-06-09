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
  };
};

export default useGame;
