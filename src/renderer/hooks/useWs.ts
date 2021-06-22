import router from "@renderer/router";
import { useStore } from "@renderer/store";
import { UserActionsType } from "@renderer/store/modules/user/actions";
import { UserMutationsType } from "@renderer/store/modules/user/mutations";
import { UserStatus } from "@renderer/store/modules/user/state";
import { RWWSDTO } from "@renderer/types/rwws/dto";
import { UserInfoDTO } from "@renderer/types/user/dto";
import { isDev } from "@renderer/utils/common";
import { gNotification } from "./useMessage";

export const wsFunc: RWWSTypes = {
  connect(ws, res) {
    gNotification(res.data.msg, res.data.type);
    const store = useStore();
    store.commit(UserMutationsType.SET_USER_STATUS, res.data.status);
    if (res.data.status === "gaming") {
      store.dispatch(UserActionsType.GAME_START, { roomId: res.data.roomId });
    }
  },
  error(ws, res) {
    gNotification(res.data.msg, res.data.type);
  },
  mate(ws, res: RWWSVO<{ msg?: string; status: UserStatus; roomId?: number }>) {
    const store = useStore();
    if (res.data.status === "matting") {
      store.dispatch(UserActionsType.MATE_DOING);
    } else if (res.data.status === "online") {
      store.dispatch(UserActionsType.MATE_END);
    } else if (res.data.status === "gaming") {
      gNotification(res.data.msg);
      store.dispatch(UserActionsType.MATE_END);
      store.dispatch(UserActionsType.GAME_START, { roomId: res.data.roomId });
    }
    store.commit(UserMutationsType.SET_USER_STATUS, res.data.status);
  },
  gameStart(ws, res: RWWSVO, rwws) {
    const gameRuntime = rwws.gameRuntime;
    gameRuntime.initGame(res.data);
  },
};
export class Rwws {
  user: UserInfoDTO;
  ws?: WebSocket;
  gameRuntime: any;
  constructor(user: UserInfoDTO) {
    this.user = user;
  }
  // 注册ws
  createWs() {
    const wsUrl = isDev()
      ? "ws://localhost:10050/rwws"
      : "ws://47.103.218.109:10050/rwws";
    const ws = new WebSocket(wsUrl);
    this.ws = ws;
    return ws;
  }
  // ws连接
  connectWs() {
    if (!this.ws) return gNotification("未创建ws服务，无法连接", "error");
    const ws = this.ws;
    ws.onopen = () => {
      this.WSFirstConnect(ws);
    };
    ws.onmessage = (e) => {
      const res = JSON.parse(e.data);
      const fn = wsFunc[res.type];
      if (fn) {
        fn(ws, res, this);
      } else {
        gNotification("收到一条无法执行的请求", "error");
      }
    };
    ws.onclose = () => {
      const store = useStore();
      store.dispatch(UserActionsType.CLEAR_WS);
      store.dispatch(UserActionsType.MATE_END);
      store.commit(UserMutationsType.SET_USER_STATUS, "offLine");
      router.push({ name: "主菜单" });
    };
    ws.onerror = () => {
      gNotification("很抱歉，在线服务连接异常，请稍后再试", "error");
    };
  }
  // json转str
  JSON(options: RWWSVO) {
    options.sourceId = this.user.id;
    return new RWWSDTO(options).toSDTO();
  }
  // ws首次连接注册信息
  WSFirstConnect(ws: WebSocket) {
    ws.send(
      this.JSON({
        data: this.user,
        type: "connect",
      })
    );
  }
  // ws 关闭
  close() {
    this.ws?.close();
  }
  // ws 发送消息
  send<T>(options: RWWSVO<T>) {
    this.ws?.send(this.JSON(options));
  }
}
