import { userStatusDict } from "@renderer/const/user";
import { Rwws } from "@renderer/hooks/useWs";
import { UserInfoDTO } from "@renderer/types/user/dto";

export type UserStatus = keyof typeof userStatusDict;
export interface GameRoom {
  roomId: number;
}
export interface UserState {
  userInfo: UserInfoDTO;
  userStatus: UserStatus;
  rwws?: Rwws;
  mateTime: number;
  mateTimer: any;
  room?: GameRoom;
  userCards: string[];
  cardList: string[];
}

const user: UserState = {
  userInfo: new UserInfoDTO(),
  userStatus: "offLine",
  rwws: null,
  mateTime: 0,
  mateTimer: null,
  room: {
    roomId: 0,
  },
  userCards: [
    "223072099521191276683913440857",
    "210733815529422233762511235760",
    "2099221073384632084822522370273107028783",
    "228232107329572274943107035805",
    "21073260252950339134245253277320256",
    "21073383782772126862324353357619982266843864729305",
    "295792107337034246943913440857",
  ],
  cardList: [],
};

export default user;
