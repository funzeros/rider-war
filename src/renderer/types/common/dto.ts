import { dpiList } from "@renderer/const";
import { formatZero } from "@renderer/utils/common";

export class SettingDTO implements SettingVO {
  dpi = JSON.stringify(dpiList[0]);
  fullScreen = false;
}

export class MsgDTO implements MsgVO {
  type: MsgType;
  content = "";
  time = "";
  name = "";
  constructor(content: string, name: string, type?: MsgType) {
    this.type = type || "world";
    const now = new Date();
    this.time = `${formatZero(now.getHours(), 2)}:${formatZero(
      now.getMinutes(),
      2
    )}:${formatZero(now.getSeconds(), 2)}`;
    this.content = content;
    this.name = name;
  }
}
