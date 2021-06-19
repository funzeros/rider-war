import { UserInfoDTO } from "../user/dto";

export class PlayerDTO extends UserInfoDTO {
  maxHP = 50;
  currentHP = 0;
}
export class BattleDTO {
  red = new PlayerDTO();
  blue = new PlayerDTO();
}
