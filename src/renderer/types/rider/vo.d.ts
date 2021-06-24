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
  effects: T[];
}
