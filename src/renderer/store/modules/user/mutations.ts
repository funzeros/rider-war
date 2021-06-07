import { StateRoot } from "@renderer/store/type";
import { UserInfoDTO } from "@renderer/types/user/dto";
import { objEncodeToStr, strDecodeToObj } from "@renderer/utils/common";
import { getStorage, removeStorage, setStorage } from "@renderer/utils/storage";

export enum UserMutationsType {
  SET_USER_INFO = "SET_USER_INFO",
  GET_USER_INFO = "GET_USER_INFO",
  CLEAR_USER_INFO = "CLEAR_USER_INFO",
  SET_RWWS = "SET_RWWS",
  CLEAR_RWWS = "CLEAR_RWWS",
}

export const userMutations = {
  [UserMutationsType.SET_USER_INFO](state: StateRoot, payload: UserInfoDTO) {
    state.user.userInfo = payload;
    const encode = objEncodeToStr(payload);
    setStorage(UserMutationsType.SET_USER_INFO, encode);
  },
  [UserMutationsType.GET_USER_INFO](state: StateRoot) {
    const data = getStorage(UserMutationsType.SET_USER_INFO);
    if (data) {
      const decode = strDecodeToObj(data);
      state.user.userInfo = decode;
    }
  },
  [UserMutationsType.CLEAR_USER_INFO](state: StateRoot) {
    state.user.userInfo = new UserInfoDTO();
    removeStorage(UserMutationsType.SET_USER_INFO);
  },
  [UserMutationsType.SET_RWWS](state: StateRoot, payload: WebSocket) {
    state.user.rwws = payload;
  },
  [UserMutationsType.CLEAR_RWWS](state: StateRoot) {
    state.user.rwws = null;
  },
};
