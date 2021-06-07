import { chatCodeAtAll } from "@renderer/utils/common";

export class Effect implements EffectVO {
  name: string;
  id: string;
  desc: string;
  func: Fn;
  constructor(name: string, opt: EffectParams) {
    const [desc] = opt;
    this.name = name;
    this.id = chatCodeAtAll(name);
    this.desc = desc;
  }
}
