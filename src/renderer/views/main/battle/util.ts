import { AnimeTimelineInstance } from "animejs";

export const getIndexFromDOMS = (x: number, doms: NodeList) => {
  for (let index = 0; index < doms.length; index++) {
    const el = doms[index];
    const { offsetLeft, offsetWidth } = el as HTMLElement;
    const center = Math.round(offsetLeft + offsetWidth / 2);
    if (x < center) {
      return index;
    }
  }
  return doms.length;
};

const actionAnimePool = {
  attack(item) {
    const sClass = ".riderInstance" + item.s;
    const tClass = ".riderInstance" + item.t;
    const os = document.querySelector(sClass) as HTMLElement;
    const ot = document.querySelector(tClass) as HTMLElement;
    const ops = os.offsetParent as HTMLElement;
    const opt = ot.offsetParent as HTMLElement;
    const x = ot.offsetLeft + opt.offsetLeft - (os.offsetLeft + ops.offsetLeft);
    const y = ot.offsetTop + opt.offsetTop - (os.offsetTop + ops.offsetTop);
    return {
      targets: sClass,
      translateX: [
        { value: x, duration: 100, easing: "easeInExpo" },
        { value: 0, duration: 100, delay: 100, easing: "easeOutExpo" },
      ],
      translateY: [
        { value: y, duration: 100, easing: "easeInExpo" },
        { value: 0, duration: 100, delay: 100, easing: "easeOutExpo" },
      ],
    };
  },
};
export class RiderBattleSys {
  static riderBattle(b: PlayerVO, r: PlayerVO, bi: number, ri: number) {
    let br = b.riderCards[bi];
    let rr = r.riderCards[ri];
    if (rr.dex > br.dex) {
      // 如果红方速度大于蓝方，红色先攻
      {
        const { oAtk, oBatk } = this.riderAttack(rr, br);
        br = oBatk;
        rr = oAtk;
      }
      // 如战后蓝色还活着则 反攻 否则移除
      if (br.cHp > 0) {
        const { oAtk, oBatk } = this.riderAttack(br, rr);
        br = oAtk;
        rr = oBatk;
        if (rr.cHp <= 0) {
          r.riderCards.splice(ri, 1);
        }
      } else {
        b.riderCards.splice(bi, 1);
      }
    } else {
      // 否则蓝色先攻
      {
        const { oAtk, oBatk } = this.riderAttack(br, rr);
        br = oAtk;
        rr = oBatk;
      }
      // 如战后红色还活着则 反攻 否则移除
      if (rr.cHp > 0) {
        const { oAtk, oBatk } = this.riderAttack(rr, br);
        br = oBatk;
        rr = oAtk;
        if (br.cHp <= 0) {
          b.riderCards.splice(bi, 1);
        }
      } else {
        r.riderCards.splice(ri, 1);
      }
    }
    return { player: { [b.id]: b, [r.id]: r } };
  }
  static riderAttack(oAtk: RiderInstance, oBatk: RiderInstance) {
    let atk = oAtk.atk;
    let { def, cHp } = oBatk;
    // 先减护甲
    def -= atk;
    oBatk.def = Math.max(def, 0);
    if (def < 0) {
      // 如果护甲不够减的 多余伤害减到生命
      cHp += def;
      oBatk.cHp = Math.max(cHp, 0);
    }
    oAtk.sAtks = Math.max(oAtk.sAtks - 1, 0);
    oAtk.cFury = Math.min(oAtk.cFury + 1, oAtk.mFury);
    oBatk.cFury = Math.min(oBatk.cFury + 1, oBatk.mFury);
    return {
      oAtk,
      oBatk,
    };
  }
  static attackOther(b: PlayerVO, r: PlayerVO, bi: number) {
    const br = b.riderCards[bi];
    const { currentHP } = r;
    r.currentHP = Math.max(currentHP - br.atk, 0);
    br.sAtks = Math.max(br.sAtks - 1, 0);
    br.cFury = Math.min(br.cFury + 1, br.mFury);
    return { player: { [b.id]: b, [r.id]: r } };
  }
  static actionAnimeCDN(list: GObj[], tl: AnimeTimelineInstance, index = 0) {
    const item = list[index];
    const fn = actionAnimePool[item.a];
    const params = (fn && fn(item)) || undefined;
    const tlRes = params ? tl.add(params) : tl;
    if (++index < list.length) {
      RiderBattleSys.actionAnimeCDN(list, tlRes, index);
    }
  }
}
