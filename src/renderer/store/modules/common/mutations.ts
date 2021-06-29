import { Rwws } from "@renderer/hooks/useWs";
import router from "@renderer/router";
import { StateRoot } from "@renderer/store/type";
import { UserItemVO } from "./state";

export enum CommonMutationsType {
  SET_USER_LIST = "SET_USER_LIST",
}

export const commonMutations = {
  [CommonMutationsType.SET_USER_LIST](state: StateRoot, payload: UserItemVO[]) {
    state.common.userList = payload;
  },
};
