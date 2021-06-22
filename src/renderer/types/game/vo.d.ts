interface PlayerVO extends UserInfoVO {
  maxHP: number;
  currentHP: number;
  maxAct: number;
  currentAct: number;
}
interface Room {
  player: GObj<PlayerVO>;
  roomId: number;
  turnId: number;
}
