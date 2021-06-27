import { EffectsKey } from "@renderer/const/effects";
import { chatCodeAtAll } from "@renderer/utils/common";
import { GMath } from "@renderer/utils/custom";

export class Rider {
  name: string; // 卡名
  rider: string;
  id: string; // id
  url: string; // 图片
  cost: number; // 费用
  hp: number; // 生命值
  atk: number; // 攻
  def: number; // 甲
  dex: number; // 速
  effects: EffectsKey[]; // 能力效果
  constructor(
    name: string,
    rider: string,
    url: string,
    effectsKeys: EffectsKey[],
    attrs: RiderAttrs
  ) {
    this.name = name;
    this.rider = rider;
    this.id = chatCodeAtAll(rider + name);
    this.url = url;
    this.effects = effectsKeys;
    const [cost, hp, atk, def, dex] = attrs;
    this.cost = cost;
    this.hp = hp;
    this.atk = atk;
    this.def = def;
    this.dex = dex;
  }
  createInstance(): RiderInstance<EffectsKey> {
    return {
      id: this.id + GMath.randomStr(),
      name: this.name,
      rider: this.rider,
      url: this.url,
      cost: this.cost,
      mHp: this.hp,
      cHp: this.hp,
      atk: this.atk,
      def: this.def,
      dex: this.dex,
      mFury: 5,
      cFury: 0,
      mAtks: 1,
      sAtks: 0,
      effects: this.effects,
    };
  }
}
