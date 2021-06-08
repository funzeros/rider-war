import { useStore } from "@renderer/store";
import { UserActionsType } from "@renderer/store/modules/user/actions";
import { RWWSDTO } from "@renderer/types/rwws/dto";
import { UserInfoDTO } from "@renderer/types/user/dto";
import { isDev } from "@renderer/utils/common";
import { gNotification } from "./useMessage";

export const wsFunc: RWWSTypes = {
  connect: (ws, res) => {
    gNotification(res.data.msg, res.data.type);
  },
  error: (ws, res) => {
    gNotification(res.data.msg, res.data.type);
  },
};
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
    if (!this.ws) return gNotification("未创建ws服务，无法连接", "error");
    const ws = this.ws;
    ws.onopen = () => {
      this.WSFirstConnect(ws, this.user);
    };
    ws.onmessage = (e) => {
      const res = JSON.parse(e.data);
      const fn = wsFunc[res.type];
      if (fn) {
        fn(ws, res);
      } else {
        gNotification("收到一条无法执行的请求");
      }
    };
    ws.onclose = () => {
      const store = useStore();
      store.dispatch(UserActionsType.CLEAR_WS);
    };
    ws.onerror = () => {
      gNotification("很抱歉，在线服务连接异常，请稍后再试");
    };
  }
  JSON(options: RWWSVO) {
    return new RWWSDTO(options).toSDTO();
  }
  WSFirstConnect(ws: WebSocket, user: UserInfoDTO) {
    ws.send(
      this.JSON({
        data: user,
        type: "connect",
        sourceId: user.id,
      })
    );
  }
}
