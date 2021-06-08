import { authTokenReq } from "@renderer/api/user";
import { gMessage } from "@renderer/hooks/useMessage";
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
  CLEAR_WS = "CLEAR_WS",
  MATE_DOING = "MATE_DOING",
  MATE_END = "MATE_END",
}
export const userActions = {
  async [UserActionsType.TOKEN_AUTH]({
    state,
    commit,
    dispatch,
  }: ActionContext<StateRoot, StateRoot>) {
    commit(UserMutationsType.GET_USER_INFO);
    if (state.user.userInfo.token) {
      const { data } = await authTokenReq();
      if (data) {
        commit(UserMutationsType.SET_USER_INFO, data);
        await dispatch(UserActionsType.INIT_WS);
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
    dispatch,
  }: ActionContext<StateRoot, StateRoot>) {
    commit(UserMutationsType.CLEAR_USER_INFO);
    await dispatch(UserActionsType.CLEAR_WS);
    return true;
  },
  async [UserActionsType.INIT_WS]({
    state,
    commit,
    dispatch,
  }: ActionContext<StateRoot, StateRoot>) {
    await dispatch(UserActionsType.CLEAR_WS);
    const rwws = new Rwws(state.user.userInfo);
    const ws = rwws.createWs();
    commit(UserMutationsType.SET_RWWS, ws);
    rwws.connectWs();
  },
  async [UserActionsType.CLEAR_WS]({
    state,
    commit,
  }: ActionContext<StateRoot, StateRoot>) {
    const ws = state.user.rwws;
    if (ws) {
      ws.close();
      commit(UserMutationsType.CLEAR_RWWS);
    }
  },
  async [UserActionsType.MATE_DOING]({
    commit,
  }: ActionContext<StateRoot, StateRoot>) {
    const timer = setInterval(() => {
      commit(UserMutationsType.SET_MATE_TIME);
    }, 1000);
    commit(UserMutationsType.SET_MATE_TIMER, timer);
  },
  async [UserActionsType.MATE_END]({
    commit,
  }: ActionContext<StateRoot, StateRoot>) {
    commit(UserMutationsType.SET_MATE_TIMER);
    commit(UserMutationsType.SET_MATE_TIME, false);
  },
};
