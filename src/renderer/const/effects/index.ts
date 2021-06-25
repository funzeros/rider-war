import { Effect } from "@renderer/types/effect/dto";

/**
 * 效果参数类型
 */
export const effectsListParams = {
  烈火一册: [""],
  流水一册: [""],
  黄雷一册: [""],
};
/**
 * 效果名类型枚举
 */
export type EffectsKey = keyof typeof effectsListParams;
/**
 * 效果对象集合
 */
export const effects: GObj<EffectVO> = {};

Object.entries(effectsListParams).forEach(
  ([name, opt]: [string, EffectParams]) => {
    effects[name] = new Effect(name, opt);
  }
);
