import { Rider } from "@renderer/types/rider/dto";
import { EffectsKey } from "../effects";

/**
 * 骑士参数类型
 */
type RiderParams = [string, EffectsKey[]];

/**
 * 骑士参数集合
 */
const riderListParams: GObj<RiderParams> = {
  假面骑士圣刃: ["", ["烈火拔刀"]],
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
