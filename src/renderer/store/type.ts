import { CommonState } from "./modules/common/state";
import { UserState } from "./modules/user/state";
export interface StateRoot {
  user: UserState;
  common: CommonState;
}
