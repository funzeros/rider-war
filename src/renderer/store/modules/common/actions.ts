import { StateRoot } from "@renderer/store/type";
import { ActionContext } from "vuex";

export enum CommonActionsType {
  SEND_MSG = "SEND_MSG",
}
export const commonActions = {
  async [CommonActionsType.SEND_MSG](
    { state }: ActionContext<StateRoot, StateRoot>,
    payload: MsgVO
  ) {
    state.user.rwws.send({
      data: payload,
      type: "chat",
    });
  },
};
