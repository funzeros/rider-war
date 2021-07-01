import { userStatusDict } from "@renderer/const/user";
export type UserStatus = keyof typeof userStatusDict;

export interface UserItemVO {
  id: number;
  name: string;
  status: UserStatus;
}
export interface CommonState {
  userList: UserItemVO[];
  msgList: MsgVO[];
}

const common: CommonState = {
  userList: [],
  msgList: [],
};

export default common;
