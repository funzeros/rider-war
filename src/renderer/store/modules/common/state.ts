import { userStatusDict } from "@renderer/const/user";
export type UserStatus = keyof typeof userStatusDict;

export interface UserItemVO {
  id: number;
  name: string;
  status: UserStatus;
}
export interface CommonState {
  userList: UserItemVO[];
}

const common: CommonState = {
  userList: [],
};

export default common;
