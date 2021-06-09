import { userStatusDict } from "@renderer/const/user";
import { Rwws } from "@renderer/hooks/useWs";
import { UserInfoDTO } from "@renderer/types/user/dto";

export type UserStatus = keyof typeof userStatusDict;
export interface UserState {
  userInfo: UserInfoDTO;
  userStatus: UserStatus;
  rwws?: Rwws;
  mateTime: number;
  mateTimer: any;
}

const user: UserState = {
  userInfo: new UserInfoDTO(),
  userStatus: "offLine",
  rwws: null,
  mateTime: 0,
  mateTimer: null,
};

export default user;
