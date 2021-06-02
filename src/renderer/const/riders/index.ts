import { Rider } from "@renderer/types/rider/dto";

export const riderList = [new Rider("假面骑士圣刃", "")];
export const riderMap = new Map();

riderList.forEach((m: Rider) => {
  riderMap.set(m.id, m);
});
