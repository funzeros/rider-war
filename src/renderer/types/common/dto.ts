import { dpiList } from "@renderer/const";

export class SettingDTO implements SettingVO {
  dpi = JSON.stringify(dpiList[0]);
}
