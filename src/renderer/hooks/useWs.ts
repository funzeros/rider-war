import router from "@renderer/router";
import { useStore } from "@renderer/store";
import { CommonMutationsType } from "@renderer/store/modules/common/mutations";
import { UserItemVO } from "@renderer/store/modules/common/state";
import { UserActionsType } from "@renderer/store/modules/user/actions";
import { UserMutationsType } from "@renderer/store/modules/user/mutations";
import { UserStatus } from "@renderer/store/modules/user/state";
import { RWWSDTO } from "@renderer/types/rwws/dto";
import { UserInfoDTO } from "@renderer/types/user/dto";
import { gMyMsg } from "./useGame";
import { gNotification } from "./useMessage";

export const wsFunc: RWWSTypes = {
  connect(ws, res) {
    res.data.msg && gNotification(res.data.msg, res.data.type);
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
  syncState(ws, res: RWWSVO, rwws) {
    const gameRuntime = rwws.gameRuntime;
    gameRuntime.initGame({ room: res.data });
  },
  nextTurn(ws, res: RWWSVO<Room>, rwws) {
    const gameRuntime = rwws.gameRuntime;
    const room = res.data;
    gameRuntime.initGame({ room });
  },
  attack(ws, res: RWWSVO<AttachVO>, rwws) {
    const gameRuntime = rwws.gameRuntime;
    const { actionList, room } = res.data;
    gameRuntime.actionAnime(actionList);
    setTimeout(() => {
      gameRuntime.initGame({ room });
    }, actionList.length * 300);
  },
  gameEnd(ws, res: RWWSVO<{ faildId: number; status: UserStatus }>) {
    const store = useStore();
    const { faildId, status } = res.data;
    if (faildId) {
      if (faildId === store.state.user.userInfo.id) {
        gMyMsg("我们输了");
      } else {
        gMyMsg("我们赢了");
      }
    } else {
      gMyMsg("平局啦");
    }
    store.commit(UserMutationsType.SET_USER_STATUS, status);
    setTimeout(() => {
      router.push({
        name: "主菜单",
      });
    }, 2000);
  },
  syncUsers(ws, res: RWWSVO<UserItemVO[]>) {
    const store = useStore();
    store.commit(CommonMutationsType.SET_USER_LIST, res.data);
  },
  chat(ws, res: RWWSVO<MsgVO>) {
    const store = useStore();
    store.commit(CommonMutationsType.PUSH_MSG, res.data);
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
    const wsUrl = process.env.BASE_WS;
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
