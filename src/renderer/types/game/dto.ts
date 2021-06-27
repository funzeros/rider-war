import { UserInfoDTO } from "../user/dto";

export class PlayerDTO extends UserInfoDTO implements PlayerVO {
  maxHP = 50;
  currentHP = 0;
  maxAct = 10;
  currentAct = 0;
  handCards: string[] = [];
  libCards: string[] = [];
  riderCards: RiderInstance[] = [];
}
export class BattleDTO {
  red = new PlayerDTO();
  blue = new PlayerDTO();
}
