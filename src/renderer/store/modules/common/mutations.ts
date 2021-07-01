import { Rwws } from "@renderer/hooks/useWs";
import router from "@renderer/router";
import { StateRoot } from "@renderer/store/type";
import { UserItemVO } from "./state";

export enum CommonMutationsType {
  SET_USER_LIST = "SET_USER_LIST",
  PUSH_MSG = "PUSH_MSG",
}

export const commonMutations = {
  [CommonMutationsType.SET_USER_LIST](state: StateRoot, payload: UserItemVO[]) {
    state.common.userList = payload;
  },
  [CommonMutationsType.PUSH_MSG](state: StateRoot, payload: MsgVO) {
    state.common.msgList = [
      ...state.common.msgList.reverse().slice(0, 50).reverse(),
      payload,
    ];
  },
};
