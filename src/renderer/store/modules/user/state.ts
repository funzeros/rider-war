import { UserInfoDTO } from "@renderer/types/user/dto";
const user = {
  userInfo: new UserInfoDTO(),
};
export type UserState = typeof user;
export default user;
