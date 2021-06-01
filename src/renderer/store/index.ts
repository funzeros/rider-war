import { createStore } from "vuex";
import getters from "./getters";
import user from "./modules/user/state";
import { userMutations } from "./modules/user/mutations";
import { userActions } from "./modules/user/actions";
import { StateRoot } from "./type";

const state: StateRoot = {
  user,
};
const mutations = {
  ...userMutations,
};

const actions = {
  ...userActions,
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
