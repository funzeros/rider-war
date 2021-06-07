type EffectParams = [string];

interface EffectVO {
  name: string; // 效果名
  id: string; // id
  desc: string; // 描述
  func: Fn; //  执行
}
