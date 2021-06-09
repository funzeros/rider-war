import { Rwws } from "@renderer/hooks/useWs";
import router from "@renderer/router";
import { StateRoot } from "@renderer/store/type";
import { UserInfoDTO } from "@renderer/types/user/dto";
import {
  mergeProperties,
  objEncodeToStr,
  strDecodeToObj,
} from "@renderer/utils/common";
import { getStorage, removeStorage, setStorage } from "@renderer/utils/storage";
import { GameRoom, UserStatus } from "./state";

export enum UserMutationsType {
  SET_USER_INFO = "SET_USER_INFO",
  GET_USER_INFO = "GET_USER_INFO",
  CLEAR_USER_INFO = "CLEAR_USER_INFO",
  SET_RWWS = "SET_RWWS",
  CLEAR_RWWS = "CLEAR_RWWS",
  SET_MATE_TIME = "SET_MATE_TIME",
  SET_MATE_TIMER = "SET_MATE_TIMER",
  SET_USER_STATUS = "SET_USER_STATUS",
  SET_ROOM = "SET_ROOM",
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
  [UserMutationsType.SET_RWWS](state: StateRoot, payload: Rwws) {
    state.user.rwws = payload;
  },
  [UserMutationsType.CLEAR_RWWS](state: StateRoot) {
    state.user.rwws = null;
  },
  [UserMutationsType.SET_MATE_TIME](state: StateRoot, payload = true) {
    if (payload) state.user.mateTime += 1;
    else state.user.mateTime = 0;
  },
  [UserMutationsType.SET_MATE_TIMER](state: StateRoot, payload?: any) {
    if (payload) state.user.mateTimer = payload;
    else {
      clearInterval(state.user.mateTimer);
      state.user.mateTimer = null;
    }
  },
  [UserMutationsType.SET_USER_STATUS](state: StateRoot, payload: UserStatus) {
    state.user.userStatus = payload;
  },
  [UserMutationsType.SET_ROOM](state: StateRoot, payload: GameRoom) {
    state.user.room = mergeProperties(state.user.room, payload);
    router.push(`/main/battle/${payload.roomId}`);
  },
};
