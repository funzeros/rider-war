import { UserInfoDTO } from "@renderer/types/user/dto";
import { isDev } from "@renderer/utils/common";
import { gMessage } from "./useMessage";
export class Rwws {
  user: UserInfoDTO;
  ws?: WebSocket;
  constructor(user: UserInfoDTO) {
    this.user = user;
  }
  createWs() {
    const wsUrl = isDev()
      ? "ws://localhost:10050/rwws"
      : "ws://47.103.218.109:10050/rwws";
    const ws = new WebSocket(wsUrl);
    this.ws = ws;
    return ws;
  }
  connectWs() {
    const ws = this.ws;
    ws.onopen = () => {
      gMessage("正在连接至线上");
      //   ws.send(WSFirstConnect(roleInfo));
    };
    ws.onmessage = (e) => {
      const res = JSON.parse(e.data);
      console.log(res);
      // WSMessage(res);
    };
    ws.onclose = () => {
      gMessage("已断开在线服务");
    };
    ws.onerror = () => {
      gMessage("很抱歉，当前设备暂不支持在线服务");
    };
  }
}
