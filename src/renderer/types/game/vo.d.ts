interface PlayerVO extends UserInfoVO {
  maxHP: number;
  currentHP: number;
  maxAct: number;
  currentAct: number;
  handCards: string[];
  libCards: string[];
}
interface Room {
  player: GObj<PlayerVO>;
  roomId: number;
  turnId: number;
}
