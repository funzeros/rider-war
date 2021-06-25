import { img } from "@renderer/assets/resource";
import { Rider } from "@renderer/types/rider/dto";
import { EffectsKey } from "../effects";

/**
 * 骑士参数类型
 */
type RiderParams = [string, string, EffectsKey[], RiderAttrs];

/**
 * 骑士参数集合
 */
const riderListParams: GObj<RiderParams> = {
  勇气飞龙: ["圣刃", img.rider.saber_01, ["烈火一册"], [3, 4, 3, 2, 3]],
  狮子战记: ["剑锋", img.rider.blades_01, ["流水一册"], [3, 4, 3, 2, 3]],
  阿兰基那神灯: ["刀剑", img.rider.espada_01, ["黄雷一册"], [3, 4, 3, 2, 3]],
  玄武神话: ["大剑", img.rider.buster_01, [], [3, 4, 3, 2, 3]],
  猿飞忍者传: ["剑斩", img.rider.kenzan_01, [], [3, 4, 3, 2, 3]],
  汉森纳茨与格雷特: ["剑闪", img.rider.slash_01, [], [3, 4, 3, 2, 3]],
  邪恶飞龙: ["王剑", img.rider.calibur_01, [], [3, 4, 3, 2, 3]],
};

/**
 * 骑士对象集合
 */
export const riderObj: GObj<Rider> = {};
/**
 *  骑士数组集合
 */

Object.entries(riderListParams).forEach(
  ([name, m]: [name: string, m: RiderParams]) => {
    const rider = new Rider(name, ...m);
    riderObj[rider.id] = rider;
  }
);
export const riderList = Object.values(riderObj);
