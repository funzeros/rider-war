import { authTokenReq } from "@renderer/api/user";
import { gMessage } from "@renderer/hooks/useMessage";
import { useGRoute } from "@renderer/hooks/useRoute";
import { Rwws } from "@renderer/hooks/useWs";
import router from "@renderer/router";
import { StateRoot } from "@renderer/store/type";
import { ActionContext } from "vuex";
import { UserMutationsType } from "./mutations";
export enum UserActionsType {
  TOKEN_AUTH = "TOKEN_AUTH",
  LOG_OUT = "LOG_OUT",
  CLEAR_ALL = "CLEAR_ALL",
  INIT_WS = "INIT_WS",
}
export const userActions = {
  async [UserActionsType.TOKEN_AUTH]({
    state,
    commit,
  }: ActionContext<StateRoot, StateRoot>) {
    commit(UserMutationsType.GET_USER_INFO);
    if (state.user.userInfo.token) {
      const { data } = await authTokenReq();
      if (data) {
        commit(UserMutationsType.SET_USER_INFO, data);
        return true;
      } else {
        commit(UserMutationsType.CLEAR_USER_INFO);
        setTimeout(() => {
          gMessage("登录授权失效了");
        }, 100);
        return false;
      }
    }
    return false;
  },
  async [UserActionsType.LOG_OUT]({
    dispatch,
  }: ActionContext<StateRoot, StateRoot>) {
    await dispatch(UserActionsType.CLEAR_ALL);
    router.push("/login");
    return true;
  },
  async [UserActionsType.CLEAR_ALL]({
    commit,
  }: ActionContext<StateRoot, StateRoot>) {
    commit(UserMutationsType.CLEAR_USER_INFO);
    return true;
  },
  async [UserActionsType.INIT_WS]({
    state,
    commit,
  }: ActionContext<StateRoot, StateRoot>) {
    const rwws = new Rwws(state.user.userInfo);
    const ws = rwws.createWs();
    commit(UserMutationsType.SET_RWWS, ws);
    rwws.connectWs();
  },
};
