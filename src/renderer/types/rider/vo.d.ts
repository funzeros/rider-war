type COSTT = number;
type HPT = number;
type ATKT = number;
type DEFT = number;
type DEXT = number;
type RiderAttrs = [COSTT, HPT, ATKT, DEFT, DEXT];

interface RiderInstance<T = string> {
  id: string;
  name: string;
  rider: string;
  url: string;
  cost: number;
  mHp: number;
  cHp: number;
  atk: number;
  def: number;
  dex: number;
  mFury: number; // 最大怒气
  cFury: number; // 当前怒气
  mAtks: number; // 最大可攻击次数
  sAtks: number; // 剩余攻击次数
  effects: T[];
}
