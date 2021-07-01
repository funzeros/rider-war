interface SettingVO {
  dpi: string;
  fullScreen: boolean;
}

declare enum msgTypes {
  world,
  whisper,
  sys,
}
type MsgType = keyof typeof msgTypes;
interface MsgVO {
  type: MsgType;
  content: string;
  time: string;
  name: string;
}
