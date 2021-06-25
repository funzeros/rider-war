type RWFn = (ws: WebSocket, res: RWWSVO, rwws: any) => void;
interface RWWSTypes {
  connect?: RWFn;
  msg?: RWFn;
  close?: RWFn;
  sys?: RWFn;
  error?: RWFn;
  mate?: RWFn;
  gameStart?: RWFn;
  syncState?: RWFn;
  nextTurn?: RWFn;
}
type RWWSType = keyof RWWSTypes;

interface RWWSVO<T = GObj> {
  code?: number; // 状态码
  data?: T; // 数据体
  type?: RWWSType; // 请求类型
  sourceId?: number; // 请求来源id
  targetId?: number; // 请求目标id
}
