import { UserInfoDTO } from "@renderer/types/user/dto";
const user = {
  userInfo: new UserInfoDTO(),
  rwws: null,
  mateTime: 0,
  mateTimer: null,
};
export type UserState = typeof user;
export default user;
