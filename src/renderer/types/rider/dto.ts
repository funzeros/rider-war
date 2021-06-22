import { effects, EffectsKey } from "@renderer/const/effects";
import { chatCodeAtAll } from "@renderer/utils/common";

export class Rider {
  name: string; // 卡名
  rider: string;
  id: string; // id
  url: string; // 图片
  const: number; // 费用
  hp: number; // 生命值
  atk: number; // 攻
  def: number; // 防
  dex: number; // 敏
  skl: number; // 技
  effects: EffectVO[]; // 能力效果
  constructor(
    name: string,
    rider: string,
    url: string,
    effectsKeys: EffectsKey[]
  ) {
    this.name = name;
    this.rider = rider;
    this.id = chatCodeAtAll(rider + name);
    this.url = url;
    this.effects = effectsKeys.map((m) => effects[m]);
  }
}
