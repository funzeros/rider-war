import { StateRoot } from "./type";

const getters = {
  token: (state: StateRoot) => state.user.userInfo.token,
};

export default getters;
