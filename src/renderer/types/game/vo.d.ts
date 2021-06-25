interface PlayerVO extends UserInfoVO {
  maxHP: number;
  currentHP: number;
  maxAct: number;
  currentAct: number;
  handCards: string[];
  libCards: string[];
  riderCards: RiderInstance[];
}
interface Room {
  player: GObj<PlayerVO>;
  roomId: number;
  turnId: number;
  round: number;
  subRound: number;
  actTime: number;
}
