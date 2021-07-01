import { createStore } from "vuex";
import getters from "./getters";
import user from "./modules/user/state";
import { userMutations } from "./modules/user/mutations";
import { userActions } from "./modules/user/actions";
import { StateRoot } from "./type";
import common from "./modules/common/state";
import { commonMutations } from "./modules/common/mutations";
import { commonActions } from "./modules/common/actions";
const state: StateRoot = {
  user,
  common,
};
const mutations = {
  ...userMutations,
  ...commonMutations,
};

const actions = {
  ...userActions,
  ...commonActions,
};

const store = createStore({
  state,
  mutations,
  actions,
  getters,
});
export function useStore() {
  return store;
}
export default store;
