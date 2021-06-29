import { StateRoot } from "./type";

const getters = {
  token: (state: StateRoot) => state.user.userInfo.token,
  rwws: (state: StateRoot) => state.user.rwws,
  userList: (state: StateRoot) => state.common.userList,
};

export default getters;
